/* ══════════════════════════════════════
   AquaMind Community JS — Nested Replies
══════════════════════════════════════ */
(function () {
'use strict';

var currentPage  = 1;
var currentSort  = 'new';
var activePostId = null;
var totalPages   = 1;
var replyingTo   = null; // { id, author } — للـ nested reply

/* ── Hardcoded translations (independent of script.js load order) ── */
var CM_TRANSLATIONS = {
    en: {
        cm_reply_submit:    'Reply',
        cm_reply_ph:        'Write a reply...',
        cm_reply_ph_inline: 'Write your reply... (Ctrl+Enter to send)',
        cm_replying_to:     'Replying to',
        cm_empty:           'No posts yet. Be the first!',
        cm_ago_s: 'just now', cm_ago_m: 'm ago', cm_ago_h: 'h ago', cm_ago_d: 'd ago',
        cm_likes: 'likes', cm_replies: 'Replies',
        cm_premium_badge:   '👑 Premium',
        cm_login_nudge:     'Join the community —',
        cm_login_link:      'Sign in to post',
        cm_translate:       'Translate',
        cm_show_original:   'Show original',
        cm_translating:     'Translating...',
        cm_add_image:       'Add Image',
        cm_img_too_large:   'Image must be under 5MB',
        cm_img_only:        'Please select an image file',
        cm_challenge_title: 'Daily Water Challenge',
        cm_challenge_sub:   'Answer 10 questions correctly to win a 5% Marketplace discount!',
        cm_challenge_start: 'Start Challenge'
    },
    ar: {
        cm_reply_submit:    'رد',
        cm_reply_ph:        'اكتب رداً...',
        cm_reply_ph_inline: 'اكتب ردك... (Ctrl+Enter للإرسال)',
        cm_replying_to:     'رداً على',
        cm_empty:           'لا توجد منشورات بعد. كن الأول!',
        cm_ago_s: 'الآن', cm_ago_m: 'د', cm_ago_h: 'س', cm_ago_d: 'ي',
        cm_likes: 'إعجاب', cm_replies: 'الردود',
        cm_premium_badge:   '👑 مميز',
        cm_login_nudge:     'انضم للمجتمع —',
        cm_login_link:      'سجّل دخولك للنشر',
        cm_translate:       'ترجم',
        cm_show_original:   'عرض الأصلي',
        cm_translating:     'جاري الترجمة...',
        cm_add_image:       'إضافة صورة',
        cm_img_too_large:   'حجم الصورة يجب أن يكون أقل من 5 ميجابايت',
        cm_img_only:        'يرجى تحديد ملف صورة فقط',
        cm_challenge_title: 'تحدي المياه اليومي',
        cm_challenge_sub:   'أجب على 10 أسئلة بشكل صحيح لتفوز بخصم 5% في المتجر!',
        cm_challenge_start: 'ابدأ التحدي'
    }
};

/* ── Language state — initialized immediately, no dependency on script.js ── */
var cmLang = localStorage.getItem('language') || 'en';
var cmT = CM_TRANSLATIONS[cmLang] || CM_TRANSLATIONS.en;

/* ── Called by script.js when language changes ── */
window.cmSetLanguage = function(lang, t) {
    cmLang = lang;
    // استخدم الترجمات الـ hardcoded أولاً، وdمرج مع أي ترجمات إضافية من script.js
    cmT = Object.assign({}, CM_TRANSLATIONS[lang] || CM_TRANSLATIONS.en, t || {});

    // placeholder inputs بالـ data-key-ph
    document.querySelectorAll('[data-key-ph]').forEach(function(el) {
        var key = el.getAttribute('data-key-ph');
        if (cmT[key]) el.placeholder = cmT[key];
    });

    // placeholders مباشرة
    var titleInp = document.getElementById('cmPostTitle');
    if (titleInp && cmT.cm_np_title_ph) titleInp.placeholder = cmT.cm_np_title_ph;
    var bodyInp = document.getElementById('cmPostBody');
    if (bodyInp && cmT.cm_np_body_ph) bodyInp.placeholder = cmT.cm_np_body_ph;
    var replyInp = document.getElementById('cmReplyBody');
    if (replyInp && cmT.cm_reply_ph) replyInp.placeholder = cmT.cm_reply_ph;

    // re-render feed with new language
    loadPosts(currentPage, currentSort);
};

/* ── Helpers ── */
function timeAgo(d) {
    var s = (Date.now() - new Date(d)) / 1000;
    var isAr = cmLang === 'ar';
    if (s < 60)    return cmT.cm_ago_s || 'just now';
    if (s < 3600) {
        var m = Math.floor(s/60);
        return isAr ? m + ' ' + (cmT.cm_ago_m||'د') : m + (cmT.cm_ago_m||'m ago');
    }
    if (s < 86400) {
        var h = Math.floor(s/3600);
        return isAr ? h + ' ' + (cmT.cm_ago_h||'س') : h + (cmT.cm_ago_h||'h ago');
    }
    var dd = Math.floor(s/86400);
    return isAr ? dd + ' ' + (cmT.cm_ago_d||'ي') : dd + (cmT.cm_ago_d||'d ago');
}
function av(name) { return (name||'?').trim().charAt(0).toUpperCase(); }
function esc(s) { var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function crown(isPremium) {
    if (!isPremium) return '';
    return '<span class="cm-crown-badge" title="Premium Member">👑</span>';
}

/* ══════════════════════════════════════
   POSTS
══════════════════════════════════════ */
function loadPosts(page, sort) {
    currentPage = page || 1;
    currentSort = sort || currentSort;
    var feed = document.getElementById('cmFeed');
    feed.innerHTML = '<div class="cm-loading"><div class="cm-spinner"></div></div>';

    fetch('community_api.php?action=get_posts&page=' + currentPage + '&sort=' + currentSort)
        .then(function(r){ return r.json(); })
        .then(function(data){
            totalPages = data.pages || 1;
            renderPosts(data.posts || []);
            renderPagination(data.total || 0);
            var el = document.getElementById('statPosts');
            if (el) el.textContent = data.total || 0;
        })
        .catch(function(){
            feed.innerHTML = '<p class="cm-error">Failed to load. Please refresh.</p>';
        });
}

function renderPosts(posts) {
    var feed = document.getElementById('cmFeed');
    if (!posts.length) {
        feed.innerHTML = '<div class="cm-empty"><div class="cm-empty-icon">💬</div><p>' + (cmT.cm_empty || 'No posts yet — start the conversation!') + '</p></div>';
        return;
    }
    feed.innerHTML = '';
    posts.forEach(function(p, i) {
        var replyLabel = p.reply_count + ' ' + (cmT.cm_replies || (p.reply_count===1?'reply':'replies'));
        var isOwner = CM_USER.isLoggedIn && p.is_mine;
        var card = document.createElement('div');
        card.className = 'cm-post-card';
        card.dataset.postId = p.id;
        card.style.animationDelay = (i * 0.06) + 's';
        card.innerHTML =
            '<div class="cm-post-meta">' +
                '<div class="cm-post-avatar">' + esc(av(p.author)) + '</div>' +
                '<div class="cm-post-author-info">' +
                    '<span class="cm-post-author">' + esc(p.author) + crown(p.is_premium) + '</span>' +
                    '<span class="cm-post-time">' + timeAgo(p.created_at) + (p.edited_at ? ' <span class="cm-edited-tag">(edited)</span>' : '') + '</span>' +
                '</div>' +
                (isOwner ?
                    '<div class="cm-post-owner-actions">' +
                        '<button class="cm-edit-post-btn" data-id="' + p.id + '" data-title="' + esc(p.title) + '" data-body="' + esc(p.body) + '" title="Edit post"><i class="fas fa-pen"></i></button>' +
                        '<button class="cm-delete-post-btn" data-id="' + p.id + '" title="Delete post"><i class="fas fa-trash"></i></button>' +
                    '</div>'
                : '') +
            '</div>' +
            '<h2 class="cm-post-title">' + esc(p.title) + '</h2>' +
            '<p class="cm-post-body">' + esc(p.body) + '</p>' +
            (p.image_path ? '<div class="cm-post-img-wrap"><img class="cm-post-img" src="' + esc(p.image_path) + '" alt="post image" loading="lazy"></div>' : '') +
            '<div class="cm-post-actions">' +
                '<button class="cm-like-btn ' + (p.i_liked?'liked':'') + '" data-id="' + p.id + '">' +
                    '<i class="' + (p.i_liked?'fas':'far') + ' fa-heart"></i>' +
                    '<span class="cm-like-count">' + p.likes + '</span>' +
                '</button>' +
                '<button class="cm-reply-open-btn" data-id="' + p.id + '" data-title="' + esc(p.title) + '" data-body="' + esc(p.body) + '" data-author="' + esc(p.author) + '">' +
                    '<i class="fas fa-comment-alt"></i>' +
                    '<span class="cm-reply-count-' + p.id + '">' + replyLabel + '</span>' +
                '</button>' +
                '<button class="cm-translate-btn">' +
                    '<i class="fas fa-language"></i> ' + (cmT.cm_translate || 'Translate') +
                '</button>' +
            '</div>';
        feed.appendChild(card);
    });

    feed.querySelectorAll('.cm-like-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (!CM_USER.isLoggedIn) { window.location.href='login.php'; return; }
            toggleLike(btn);
        });
    });

    // Edit post buttons
    feed.querySelectorAll('.cm-edit-post-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            openEditModal(btn.dataset.id, btn.dataset.title, btn.dataset.body);
        });
    });

    // Delete post buttons
    feed.querySelectorAll('.cm-delete-post-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            confirmDeletePost(btn.dataset.id);
        });
    });

    // Image lightbox
    feed.querySelectorAll('.cm-post-img-wrap').forEach(function(wrap) {
        wrap.addEventListener('click', function() {
            var src = wrap.querySelector('img').src;
            var lb = document.createElement('div');
            lb.className = 'cm-lightbox';
            lb.innerHTML = '<button class="cm-lightbox-close"><i class="fas fa-times"></i></button><img src="' + src + '" alt="">';
            document.body.appendChild(lb);
            document.body.style.overflow = 'hidden';
            lb.addEventListener('click', function(e) {
                if (e.target === lb || e.target.closest('.cm-lightbox-close')) {
                    lb.remove();
                    document.body.style.overflow = '';
                }
            });
            document.addEventListener('keydown', function escLb(e) {
                if (e.key === 'Escape') { lb.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', escLb); }
            });
        });
    });
    feed.querySelectorAll('.cm-reply-open-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            openModal(btn.dataset.id, btn.dataset.title, btn.dataset.body, btn.dataset.author);
        });
    });
    feed.querySelectorAll('.cm-translate-btn').forEach(function(btn) {
        initTranslateBtn(btn);
    });
}

function renderPagination(total) {
    var pag = document.getElementById('cmPagination');
    pag.innerHTML = '';
    if (totalPages <= 1) return;
    for (var i = 1; i <= totalPages; i++) {
        var btn = document.createElement('button');
        btn.className = 'cm-page-btn' + (i===currentPage?' active':'');
        btn.textContent = i;
        btn.dataset.page = i;
        btn.addEventListener('click', function(){
            loadPosts(parseInt(this.dataset.page));
            window.scrollTo({top:0,behavior:'smooth'});
        });
        pag.appendChild(btn);
    }
}

function toggleLike(btn) {
    btn.disabled = true;
    fetch('community_api.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'action=toggle_like&post_id='+btn.dataset.id
    }).then(function(r){return r.json();}).then(function(res){
        if (res.ok) {
            btn.classList.toggle('liked', res.liked);
            btn.querySelector('i').className = res.liked?'fas fa-heart':'far fa-heart';
            btn.querySelector('.cm-like-count').textContent = res.likes;
            btn.classList.add('cm-like-pop');
            setTimeout(function(){ btn.classList.remove('cm-like-pop'); }, 300);
        }
    }).finally(function(){ btn.disabled=false; });
}

/* ══════════════════════════════════════
   MODAL — Nested Replies
══════════════════════════════════════ */
function openModal(postId, title, body, author) {
    activePostId = postId;
    replyingTo   = null;
    document.getElementById('cmModalTitle').textContent = 'Replies';
    document.getElementById('cmModalPostPreview').innerHTML =
        '<div class="cm-preview-author">' + esc(author) + '</div>' +
        '<div class="cm-preview-title">' + esc(title) + '</div>' +
        '<div class="cm-preview-body">' + esc(body) + '</div>';

    resetReplyBox();
    document.getElementById('cmReplyModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    loadReplies(postId);
}

function loadReplies(postId) {
    var container = document.getElementById('cmModalReplies');
    container.innerHTML = '<div class="cm-loading"><div class="cm-spinner"></div></div>';

    fetch('community_api.php?action=get_replies&post_id=' + postId)
        .then(function(r){ return r.json(); })
        .then(function(data){
            var replies = data.replies || [];
            if (!replies.length) {
                container.innerHTML = '<div class="cm-no-replies">' + (cmT.cm_empty || 'No replies yet — be the first! 💬') + '</div>';
                return;
            }
            // بنبني tree من flat array
            var tree = buildTree(replies);
            container.innerHTML = '';
            renderTree(tree, container, 0);
        });
}

/* بيحول الـ flat array لـ tree */
function buildTree(replies) {
    var map = {}, roots = [];
    replies.forEach(function(r) {
        r.children = [];
        map[r.id]  = r;
    });
    replies.forEach(function(r) {
        if (r.parent_id && map[r.parent_id]) {
            map[r.parent_id].children.push(r);
        } else {
            roots.push(r);
        }
    });
    return roots;
}

/* بيرسم الـ tree بشكل متداخل */
function renderTree(nodes, container, depth) {
    nodes.forEach(function(r) {
        var wrap = document.createElement('div');
        wrap.className = 'cm-reply-wrap';
        if (depth > 0) wrap.classList.add('cm-reply-nested');
        wrap.style.marginLeft = Math.min(depth, 4) * 24 + 'px';

        wrap.innerHTML =
            '<div class="cm-reply-card" data-id="' + r.id + '">' +
                '<div class="cm-reply-meta">' +
                    '<div class="cm-reply-avatar" style="background:' + depthColor(depth) + '">' + esc(av(r.author)) + '</div>' +
                    '<span class="cm-reply-author">' + esc(r.author) + crown(r.is_premium) + '</span>' +
                    '<span class="cm-reply-time">' + timeAgo(r.created_at) + '</span>' +
                    (depth > 0 ? '<span class="cm-reply-tag">↩ reply</span>' : '') +
                '</div>' +
                '<p class="cm-reply-body">' + esc(r.body) + '</p>' +
                '<div class="cm-reply-actions">' +
                (CM_USER.isLoggedIn ?
                    '<button class="cm-inline-reply-btn" data-id="' + r.id + '" data-author="' + esc(r.author) + '">' +
                        '<i class="fas fa-reply"></i> ' + (cmT.cm_reply_submit||'Reply') +
                    '</button>'
                : '') +
                '<button class="cm-translate-btn cm-translate-reply">' +
                    '<i class="fas fa-language"></i> ' + (cmT.cm_translate || 'Translate') +
                '</button>' +
                '</div>' +
            '</div>';

        container.appendChild(wrap);

        // اضغط Reply جوه الكارد
        var inlineBtn = wrap.querySelector('.cm-inline-reply-btn');
        if (inlineBtn) {
            inlineBtn.addEventListener('click', function() {
                setReplyingTo(r.id, r.author, wrap);
            });
        }

        var tBtn = wrap.querySelector('.cm-translate-btn');
        if (tBtn) initTranslateBtn(tBtn);

        // الـ children
        if (r.children && r.children.length) {
            var childContainer = document.createElement('div');
            childContainer.className = 'cm-children';
            wrap.appendChild(childContainer);
            renderTree(r.children, childContainer, depth + 1);
        }
    });
}

/* لون الـ avatar بيتغير حسب الـ depth */
function depthColor(depth) {
    var colors = [
        'linear-gradient(135deg,#1a56a0,#0ea5e9)',
        'linear-gradient(135deg,#0891b2,#06b6d4)',
        'linear-gradient(135deg,#0d9488,#14b8a6)',
        'linear-gradient(135deg,#7c3aed,#a78bfa)',
        'linear-gradient(135deg,#db2777,#f472b6)'
    ];
    return colors[Math.min(depth, colors.length-1)];
}

/* ── Translation Cache ── */
var translateCache = {};

function translateText(text, targetLang, callback) {
    var cacheKey = targetLang + '::' + text;
    if (translateCache[cacheKey]) { callback(null, translateCache[cacheKey]); return; }

    var langPair = targetLang === 'ar' ? 'en|ar' : 'ar|en';
    var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + langPair;

    fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var translated = data.responseData && data.responseData.translatedText;
            if (translated) {
                translateCache[cacheKey] = translated;
                callback(null, translated);
            } else {
                callback('Translation unavailable');
            }
        })
        .catch(function() { callback('Network error'); });
}

/* ── Translate Button handler ── */
function initTranslateBtn(btn) {
    btn.addEventListener('click', function() {
        var card      = btn.closest('.cm-post-card, .cm-reply-card');
        var bodyEl    = card.querySelector('.cm-post-body, .cm-reply-body');
        var titleEl   = card.querySelector('.cm-post-title');   // posts only
        var isShowing = btn.dataset.translated === '1';
        var targetLang = cmLang === 'ar' ? 'ar' : 'en';

        if (isShowing) {
            // رجّع الأصلي
            bodyEl.textContent  = btn.dataset.origBody;
            if (titleEl) titleEl.textContent = btn.dataset.origTitle;
            btn.innerHTML = '<i class="fas fa-language"></i> ' + (cmT.cm_translate || 'Translate');
            btn.dataset.translated = '0';
            btn.classList.remove('cm-translate-active');
            return;
        }

        // خزّن النص الأصلي
        if (!btn.dataset.origBody) btn.dataset.origBody = bodyEl.textContent;
        if (titleEl && !btn.dataset.origTitle) btn.dataset.origTitle = titleEl.textContent;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (cmT.cm_translating || 'Translating...');
        btn.disabled = true;

        var toTranslate = (titleEl ? btn.dataset.origTitle + '\n' : '') + btn.dataset.origBody;

        translateText(toTranslate, targetLang, function(err, result) {
            btn.disabled = false;
            if (err) {
                btn.innerHTML = '<i class="fas fa-language"></i> ' + (cmT.cm_translate || 'Translate');
                return;
            }
            if (titleEl) {
                var parts = result.split('\n');
                titleEl.textContent = parts[0] || titleEl.textContent;
                bodyEl.textContent  = parts.slice(1).join('\n') || result;
            } else {
                bodyEl.textContent = result;
            }
            btn.innerHTML      = '<i class="fas fa-undo"></i> ' + (cmT.cm_show_original || 'Show original');
            btn.dataset.translated = '1';
            btn.classList.add('cm-translate-active');
        });
    });
}


function setReplyingTo(replyId, authorName, afterWrap) {
    replyingTo = { id: replyId, author: authorName };

    // أزّل أي inline form موجود
    var existing = document.querySelector('.cm-inline-form');
    if (existing) existing.remove();

    // أنشئ form صغير جوه الـ modal تحت الرد المختار
    var form = document.createElement('div');
    form.className = 'cm-inline-form';
    form.innerHTML =
        '<div class="cm-inline-form-header">' +
            '<span class="cm-replying-to-label">↩ ' + (cmT.cm_replying_to||'Replying to') + ' <strong>' + esc(authorName) + '</strong></span>' +
            '<button class="cm-cancel-inline">✕</button>' +
        '</div>' +
        '<div class="cm-inline-form-body">' +
            '<textarea class="cm-reply-input cm-inline-textarea" placeholder="' + (cmT.cm_reply_ph_inline||'Write your reply... (Ctrl+Enter to send)') + '" rows="3"></textarea>' +
            '<button class="cm-submit-btn cm-inline-submit"><i class="fas fa-reply"></i> ' + (cmT.cm_reply_submit||'Reply') + '</button>' +
        '</div>';

    afterWrap.appendChild(form);

    // Focus
    setTimeout(function(){ form.querySelector('textarea').focus(); }, 50);

    // Cancel
    form.querySelector('.cm-cancel-inline').addEventListener('click', function(){
        form.remove();
        replyingTo = null;
    });

    // Submit inline
    form.querySelector('.cm-inline-submit').addEventListener('click', function(){
        submitReply(form.querySelector('textarea').value, form);
    });

    form.querySelector('textarea').addEventListener('keydown', function(e){
        if (e.ctrlKey && e.key === 'Enter') submitReply(this.value, form);
    });
}

function resetReplyBox() {
    replyingTo = null;
    var existing = document.querySelector('.cm-inline-form');
    if (existing) existing.remove();
    var inp = document.getElementById('cmReplyBody');
    if (inp) inp.value = '';
    var lbl = document.getElementById('cmReplyingToLabel');
    if (lbl) lbl.style.display = 'none';
}

function submitReply(body, formEl) {
    body = (body || '').trim();
    if (!body || !activePostId) return;

    var submitBtn = formEl ? formEl.querySelector('.cm-submit-btn, .cm-reply-submit') : document.getElementById('cmSubmitReply');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; }

    var parentId = replyingTo ? replyingTo.id : 0;

    fetch('community_api.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'action=create_reply&post_id=' + activePostId +
              '&parent_id=' + parentId +
              '&body=' + encodeURIComponent(body)
    })
    .then(function(r){ return r.json(); })
    .then(function(res){
        if (res.ok) {
            // امسح الـ form
            if (formEl && formEl.classList.contains('cm-inline-form')) {
                formEl.remove();
            } else {
                var inp = document.getElementById('cmReplyBody');
                if (inp) inp.value = '';
            }
            replyingTo = null;
            // حدّث الردود
            loadReplies(activePostId);
            // حدّث العداد في الفيد
            var span = document.querySelector('.cm-reply-count-' + activePostId);
            if (span) {
                var cur  = parseInt(span.textContent) || 0;
                var next = cur + 1;
                span.textContent = next + ' ' + (next===1?'reply':'replies');
            }
        }
    })
    .finally(function(){
        if (submitBtn) { submitBtn.disabled=false; submitBtn.innerHTML='<i class="fas fa-reply"></i> Reply'; }
    });
}

/* ══════════════════════════════════════
   EDIT POST MODAL
══════════════════════════════════════ */
function openEditModal(postId, title, body) {
    // أنشئ modal لو مش موجود
    var existing = document.getElementById('cmEditModal');
    if (existing) existing.remove();

    var modal = document.createElement('div');
    modal.id = 'cmEditModal';
    modal.className = 'cm-modal-overlay';
    modal.innerHTML =
        '<div class="cm-modal cm-edit-modal-inner">' +
            '<div class="cm-modal-header">' +
                '<h3><i class="fas fa-pen"></i> Edit Post</h3>' +
                '<button class="cm-modal-close" id="cmEditModalClose">✕</button>' +
            '</div>' +
            '<div style="padding: 20px 24px 24px;">' +
                '<input type="text" id="cmEditTitle" class="cm-post-title-input" maxlength="255" value="' + esc(title) + '" placeholder="Post title" style="margin-bottom:12px;">' +
                '<textarea id="cmEditBody" class="cm-post-body-input" rows="6" placeholder="Post body">' + esc(body) + '</textarea>' +
                '<div class="cm-np-actions" style="margin-top:12px;">' +
                    '<button class="cm-cancel-btn" id="cmEditCancel">Cancel</button>' +
                    '<button class="cm-submit-btn" id="cmEditSave" data-id="' + postId + '"><i class="fas fa-save"></i> Save</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    document.body.appendChild(modal);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('cmEditTitle').focus();

    document.getElementById('cmEditModalClose').addEventListener('click', closeEditModal);
    document.getElementById('cmEditCancel').addEventListener('click', closeEditModal);
    modal.addEventListener('click', function(e){ if(e.target===modal) closeEditModal(); });
    document.getElementById('cmEditSave').addEventListener('click', function() {
        saveEditedPost(postId);
    });
}

function closeEditModal() {
    var m = document.getElementById('cmEditModal');
    if (m) m.remove();
    document.body.style.overflow = '';
}

function saveEditedPost(postId) {
    var title = (document.getElementById('cmEditTitle').value || '').trim();
    var body  = (document.getElementById('cmEditBody').value  || '').trim();
    if (!title || !body) { shake(document.getElementById('cmEditModal')); return; }

    var btn = document.getElementById('cmEditSave');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    fetch('community_api.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'action=edit_post&post_id=' + encodeURIComponent(postId) +
              '&title=' + encodeURIComponent(title) +
              '&body='  + encodeURIComponent(body)
    })
    .then(function(r){ return r.json(); })
    .then(function(res) {
        if (res.ok) {
            // حدّث الكارد في الـ feed مباشرة بدون reload
            var card = document.querySelector('.cm-post-card[data-post-id="' + postId + '"]');
            if (card) {
                card.querySelector('.cm-post-title').textContent = res.title;
                card.querySelector('.cm-post-body').textContent  = res.body;
                // حدّث data attributes على زرار الـ edit
                var editBtn = card.querySelector('.cm-edit-post-btn');
                if (editBtn) {
                    editBtn.dataset.title = res.title;
                    editBtn.dataset.body  = res.body;
                }
                // أضف "(edited)" بعد الوقت لو مش موجودة
                var timeEl = card.querySelector('.cm-post-time');
                if (timeEl && !timeEl.querySelector('.cm-edited-tag')) {
                    timeEl.insertAdjacentHTML('beforeend', ' <span class="cm-edited-tag">(edited)</span>');
                }
            }
            closeEditModal();
        }
    })
    .catch(function() {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-save"></i> Save';
    });
}

/* ── Delete Post ── */
function confirmDeletePost(postId) {
    // Confirm dialog
    var confirmed = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
    if (!confirmed) return;

    fetch('community_api.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'action=delete_post&post_id=' + encodeURIComponent(postId)
    })
    .then(function(r){ return r.json(); })
    .then(function(res) {
        if (res.ok) {
            // أزّل الكارد بـ animation
            var card = document.querySelector('.cm-post-card[data-post-id="' + postId + '"]');
            if (card) {
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(function() {
                    card.remove();
                    // حدّث الـ stats
                    var statEl = document.getElementById('statPosts');
                    if (statEl) statEl.textContent = Math.max(0, (parseInt(statEl.textContent)||1) - 1);
                }, 300);
            }
        }
    });
}

function closeModal() {
    document.getElementById('cmReplyModal').style.display = 'none';
    document.body.style.overflow = '';
    activePostId = null;
    replyingTo   = null;
    var existing = document.querySelector('.cm-inline-form');
    if (existing) existing.remove();
}

/* ══════════════════════════════════════
   NEW POST
══════════════════════════════════════ */
/* ══════════════════════════════════════
   IMAGE COMPRESSION
══════════════════════════════════════ */
var cmSelectedImageB64 = null; // base64 string of compressed image

function compressImage(file, maxW, maxH, quality, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement('canvas');
            var w = img.width, h = img.height;
            // Scale down if needed
            if (w > maxW || h > maxH) {
                var ratio = Math.min(maxW / w, maxH / h);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
            }
            canvas.width  = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            // Get compressed base64 (strip the data:image/...;base64, prefix)
            var b64 = canvas.toDataURL('image/jpeg', quality);
            callback(b64);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function submitPost() {
    var title = (document.getElementById('cmPostTitle').value||'').trim();
    var body  = (document.getElementById('cmPostBody').value ||'').trim();
    if (!title||!body) { shake(document.getElementById('cmNewPost')); return; }

    var btn = document.getElementById('cmSubmitPost');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';

    var bodyData = 'action=create_post&title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
    if (cmSelectedImageB64) {
        bodyData += '&image=' + encodeURIComponent(cmSelectedImageB64);
    }

    fetch('community_api.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: bodyData
    }).then(function(r){return r.json();}).then(function(res){
        if (res.ok) {
            document.getElementById('cmPostTitle').value='';
            document.getElementById('cmPostBody').value='';
            document.getElementById('cmNpForm').style.display='none';
            // Reset image
            cmSelectedImageB64 = null;
            var wrap = document.getElementById('cmImgPreviewWrap');
            if (wrap) wrap.style.display='none';
            var inp = document.getElementById('cmPostImage');
            if (inp) inp.value='';
            document.querySelectorAll('.cm-sort-btn').forEach(function(b){b.classList.remove('active');});
            document.querySelector('.cm-sort-btn[data-sort="new"]').classList.add('active');
            loadPosts(1,'new');
        }
    }).finally(function(){
        btn.disabled=false;
        btn.innerHTML='<i class="fas fa-paper-plane"></i> Post';
    });
}

function shake(el) {
    el.classList.add('cm-shake');
    setTimeout(function(){ el.classList.remove('cm-shake'); }, 500);
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
    loadPosts(1);

    // Image upload
    var imgInput = document.getElementById('cmPostImage');
    var imgPreviewWrap = document.getElementById('cmImgPreviewWrap');
    var imgPreview = document.getElementById('cmImgPreview');
    var imgRemove = document.getElementById('cmImgRemove');

    if (imgInput) {
        imgInput.addEventListener('change', function() {
            var file = this.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert(cmT.cm_img_only || 'Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert(cmT.cm_img_too_large || 'Image must be under 5MB');
                this.value = '';
                return;
            }
            // Compress: max 1200x1200, quality 0.75
            compressImage(file, 1200, 1200, 0.75, function(b64) {
                cmSelectedImageB64 = b64;
                imgPreview.src = b64;
                imgPreviewWrap.style.display = 'flex';
            });
        });
    }

    if (imgRemove) {
        imgRemove.addEventListener('click', function() {
            cmSelectedImageB64 = null;
            imgPreview.src = '';
            imgPreviewWrap.style.display = 'none';
            if (imgInput) imgInput.value = '';
        });
    }

    // Sort
    document.querySelectorAll('.cm-sort-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.cm-sort-btn').forEach(function(b){b.classList.remove('active');});
            btn.classList.add('active');
            loadPosts(1, btn.dataset.sort);
        });
    });

    // New post toggle
    var toggle = document.getElementById('cmNpToggle');
    if (toggle) toggle.addEventListener('click', function() {
        var f = document.getElementById('cmNpForm');
        f.style.display = f.style.display==='none'?'block':'none';
        if (f.style.display==='block') document.getElementById('cmPostTitle').focus();
    });

    var cancelBtn = document.getElementById('cmCancelPost');
    if (cancelBtn) cancelBtn.addEventListener('click', function() {
        document.getElementById('cmNpForm').style.display='none';
        document.getElementById('cmPostTitle').value='';
        document.getElementById('cmPostBody').value='';
    });

    var submitBtn = document.getElementById('cmSubmitPost');
    if (submitBtn) submitBtn.addEventListener('click', submitPost);

    var titleInp = document.getElementById('cmPostTitle');
    if (titleInp) titleInp.addEventListener('input', function(){
        document.getElementById('cmTitleCount').textContent = this.value.length+'/255';
    });

    // Modal close
    document.getElementById('cmModalClose').addEventListener('click', closeModal);
    document.getElementById('cmReplyModal').addEventListener('click', function(e){
        if (e.target===this) closeModal();
    });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });

    // Main reply box (top-level reply)
    var mainReplyBtn = document.getElementById('cmSubmitReply');
    if (mainReplyBtn) mainReplyBtn.addEventListener('click', function(){
        var val = document.getElementById('cmReplyBody').value;
        submitReply(val, document.getElementById('cmReplyBody').closest('.cm-modal-reply-box'));
    });

    var mainReplyInp = document.getElementById('cmReplyBody');
    if (mainReplyInp) mainReplyInp.addEventListener('keydown', function(e){
        if (e.ctrlKey && e.key==='Enter') {
            submitReply(this.value, this.closest('.cm-modal-reply-box'));
        }
    });

    var postInp = document.getElementById('cmPostBody');
    if (postInp) postInp.addEventListener('keydown', function(e){
        if (e.ctrlKey && e.key==='Enter') submitPost();
    });

    // طبّق الترجمة فوراً من الـ hardcoded CM_TRANSLATIONS (مش محتاجين script.js)
    document.querySelectorAll('[data-key-ph]').forEach(function(el) {
        var key = el.getAttribute('data-key-ph');
        if (cmT[key]) el.placeholder = cmT[key];
    });
    var replyInpInit = document.getElementById('cmReplyBody');
    if (replyInpInit && cmT.cm_reply_ph) replyInpInit.placeholder = cmT.cm_reply_ph;

    // لو script.js جاهز كمان — دمج ترجماته
    // Translation init
    setTimeout(function() {
        var savedLang = localStorage.getItem('language') || 'en';
        if (window.translations && window.translations[savedLang]) {
            cmSetLanguage(savedLang, window.translations[savedLang]);
        }
    }, 50);

    /* ══════════════════════════════════════
       Daily Challenge Logic
    ══════════════════════════════════════ */
    const challengeQuestions = [
        {
            en: { q: "What percentage of the Earth's surface is covered by water?", options: ["50%", "61%", "71%", "81%"] },
            ar: { q: "ما هي نسبة تغطية المياه لسطح الأرض؟", options: ["50%", "61%", "71%", "81%"] },
            answer: 2
        },
        {
            en: { q: "How much of the Earth's water is fresh water?", options: ["3%", "10%", "25%", "50%"] },
            ar: { q: "ما هي نسبة المياه العذبة من إجمالي مياه الأرض؟", options: ["3%", "10%", "25%", "50%"] },
            answer: 0
        },
        {
            en: { q: "How much water can a dripping faucet waste in a day?", options: ["1 gallon", "5 gallons", "Up to 20 gallons", "50 gallons"] },
            ar: { q: "كمية المياه التي يمكن أن يهدرها صنبور يقطر في اليوم؟", options: ["1 جالون", "5 جالونات", "حتى 20 جالون", "50 جالون"] },
            answer: 2
        },
        {
            en: { q: "Which household activity typically uses the most water?", options: ["Washing clothes", "Flushing the toilet", "Showering", "Washing dishes"] },
            ar: { q: "أي نشاط منزلي يستهلك عادة أكبر قدر من المياه؟", options: ["غسيل الملابس", "السيفون (المرحاض)", "الاستحمام", "غسيل الأطباق"] },
            answer: 1
        },
        {
            en: { q: "How long should a water-saving shower ideally last?", options: ["5 minutes", "10 minutes", "15 minutes", "20 minutes"] },
            ar: { q: "ما هي المدة المثالية للاستحمام الموفر للمياه؟", options: ["5 دقائق", "10 دقائق", "15 دقيقة", "20 دقيقة"] },
            answer: 0
        },
        {
            en: { q: "What is greywater?", options: ["Rainwater", "Wastewater from toilets", "Wastewater from sinks and baths", "Ocean water"] },
            ar: { q: "ما هي المياه الرمادية؟", options: ["مياه الأمطار", "مياه الصرف من المراحيض", "مياه الصرف من الأحواض والاستحمام", "مياه المحيط"] },
            answer: 2
        },
        {
            en: { q: "When is the best time of day to water your garden?", options: ["Early morning", "Noon", "Late afternoon", "Midnight"] },
            ar: { q: "متى يكون أفضل وقت في اليوم لري حديقتك؟", options: ["في الصباح الباكر", "عند الظهر", "في وقت متأخر من بعد الظهر", "في منتصف الليل"] },
            answer: 0
        },
        {
            en: { q: "How much water do you save by turning off the tap while brushing your teeth?", options: ["1 gallon", "3 gallons", "Up to 8 gallons", "15 gallons"] },
            ar: { q: "كمية المياه التي توفرها عند إغلاق الصنبور أثناء غسل أسنانك؟", options: ["1 جالون", "3 جالونات", "حتى 8 جالونات", "15 جالون"] },
            answer: 2
        },
        {
            en: { q: "What is the primary cause of water pollution globally?", options: ["Plastic waste", "Agriculture", "Oil spills", "Industrial waste"] },
            ar: { q: "ما هو السبب الرئيسي لتلوث المياه عالميًا؟", options: ["النفايات البلاستيكية", "الزراعة", "التسربات النفطية", "النفايات الصناعية"] },
            answer: 1
        },
        {
            en: { q: "Which device can reduce shower water usage by up to 40%?", options: ["Water heater", "Low-flow showerhead", "Water filter", "High-pressure pump"] },
            ar: { q: "أي جهاز يمكن أن يقلل من استخدام مياه الاستحمام بنسبة تصل إلى 40٪؟", options: ["سخان المياه", "رأس دش منخفض التدفق", "فلتر المياه", "مضخة ضغط عالي"] },
            answer: 1
        }
    ];

    const challengeBody = document.getElementById('challengeBody');
    const startBtn = document.getElementById('startChallengeBtn');
    let currentQ = 0;
    let timerInterval;
    let timeLeft = 10;
    let isChallengeActive = false;

    if (startBtn) {
        startBtn.addEventListener('click', startChallenge);
    }

    function startChallenge() {
        if (!CM_USER.isLoggedIn) {
            window.location.href = 'login.php';
            return;
        }
        currentQ = 0;
        isChallengeActive = true;
        renderQuestion();
    }

    function renderQuestion() {
        if (currentQ >= challengeQuestions.length) {
            winChallenge();
            return;
        }

        const lang = cmLang || 'en';
        const qData = challengeQuestions[currentQ];
        const text = qData[lang] || qData['en'];
        
        const strQ = lang === 'ar' ? "سؤال" : "Question";
        const strOf = lang === 'ar' ? "من" : "of";

        challengeBody.innerHTML = `
            <div class="cm-ch-question-info">
                <span>${strQ} ${currentQ + 1} ${strOf} ${challengeQuestions.length}</span>
                <span id="chTimerText">10s</span>
            </div>
            <div class="cm-ch-timer-bar">
                <div class="cm-ch-timer-fill" id="chTimerFill"></div>
            </div>
            <div class="cm-ch-question">${text.q}</div>
            <div class="cm-ch-options" id="chOptions">
                ${text.options.map((opt, idx) => `<button class="cm-ch-option" data-idx="${idx}">${opt}</button>`).join('')}
            </div>
        `;

        const options = document.querySelectorAll('.cm-ch-option');
        options.forEach(opt => {
            opt.addEventListener('click', function() {
                checkAnswer(parseInt(this.getAttribute('data-idx')), this, qData.answer);
            });
        });

        startTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 10;
        const fill = document.getElementById('chTimerFill');
        const text = document.getElementById('chTimerText');
        
        // Reset visual transition immediately
        fill.style.transition = 'none';
        fill.style.width = '100%';
        fill.style.backgroundColor = '#10b981';

        // Trigger reflow
        void fill.offsetWidth;

        // Start animation
        fill.style.transition = 'width 1s linear, background-color 0.3s';

        timerInterval = setInterval(() => {
            timeLeft--;
            text.textContent = timeLeft + 's';
            fill.style.width = (timeLeft * 10) + '%';
            
            if (timeLeft <= 3) {
                fill.style.backgroundColor = '#ef4444';
                text.style.color = '#ef4444';
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                const lang = cmLang || 'en';
                const msgTimeUp = lang === 'ar' ? "انتهى الوقت!" : "Time's up!";
                failChallenge(msgTimeUp);
            }
        }, 1000);
    }

    function checkAnswer(selectedIdx, btnElement, correctIdx) {
        clearInterval(timerInterval);
        const options = document.querySelectorAll('.cm-ch-option');
        options.forEach(opt => opt.disabled = true);

        if (selectedIdx === correctIdx) {
            btnElement.classList.add('correct');
            setTimeout(() => {
                currentQ++;
                renderQuestion();
            }, 1000);
        } else {
            btnElement.classList.add('wrong');
            options[correctIdx].classList.add('correct'); // Show correct answer
            setTimeout(() => {
                const lang = cmLang || 'en';
                const msgWrong = lang === 'ar' ? "إجابة خاطئة. حظ أوفر غداً!" : "Incorrect answer. Better luck tomorrow!";
                failChallenge(msgWrong);
            }, 1500);
        }
    }

    function failChallenge(msg) {
        isChallengeActive = false;
        const lang = cmLang || 'en';
        const strFailTitle = lang === 'ar' ? "فشلت في التحدي" : "Challenge Failed";
        const strTryAgain = lang === 'ar' ? "حاول مجدداً غداً" : "Try Again Tomorrow";

        challengeBody.innerHTML = `
            <div class="cm-ch-result">
                <div class="cm-ch-result-icon fail"><i class="fas fa-times-circle"></i></div>
                <h4>${strFailTitle}</h4>
                <p>${msg}</p>
                <button class="cm-ch-start-btn" onclick="location.reload()">${strTryAgain}</button>
            </div>
        `;
    }

    function winChallenge() {
        isChallengeActive = false;
        const lang = cmLang || 'en';
        const strWinTitle = lang === 'ar' ? 'تهانينا!' : 'Congratulations!';
        const strWinText  = lang === 'ar'
            ? 'لقد أجبت على جميع الأسئلة العشرة بشكل صحيح. إليك كود خصم 5% للمتجر:'
            : "You've answered all 10 questions correctly. Here is your 5% discount code for the Marketplace:";
        const strSaving   = lang === 'ar' ? 'جاري حفظ الكود...' : 'Saving your code...';
        const strGoMarket = lang === 'ar' ? '🛒 اذهب للمتجر لاستخدام الكود' : '🛒 Go to Marketplace to use it';
        const strFailed   = lang === 'ar' ? '⚠️ تعذّر حفظ الكود، حاول مرة أخرى.' : '⚠️ Could not save your code. Try again.';

        challengeBody.innerHTML = `
            <div class="cm-ch-result">
                <div class="cm-ch-result-icon success"><i class="fas fa-trophy"></i></div>
                <h4>${strWinTitle}</h4>
                <p>${strWinText}</p>
                <div class="cm-ch-coupon">AQUA5OFF</div>
                <p id="chSaveStatus" style="margin-top:12px;font-size:.85rem;color:var(--cm-sub)">${strSaving}</p>
            </div>
        `;

        // Save to DB
        if (CM_USER.isLoggedIn) {
            fetch('voucher.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'api=challenge_win'
            })
            .then(r => r.json())
            .then(data => {
                const statusEl = document.getElementById('chSaveStatus');
                if (statusEl) {
                    if (data.ok) {
                        statusEl.innerHTML = `<a href="marketplace.php" style="color:#f59e0b;font-weight:700;">${strGoMarket}</a>`;
                    } else {
                        statusEl.textContent = strFailed;
                        statusEl.style.color = '#ef4444';
                    }
                }
            })
            .catch(() => {
                const statusEl = document.getElementById('chSaveStatus');
                if (statusEl) { statusEl.textContent = strFailed; statusEl.style.color = '#ef4444'; }
            });
        }
    }

});

})();