<script>
// ==============================
// 👤 USER PROFILE DROPDOWN
// ==============================
const userToggle = document.getElementById("user-toggle");
const userMenu   = document.getElementById("user-menu");

if (userToggle && userMenu) {
    userToggle.addEventListener("click", e => {
        e.stopPropagation();
        userMenu.classList.toggle("show");
        langMenu.classList.remove("show");
        var nm = document.getElementById("notifMenu");
        if (nm) nm.classList.remove("notif-open");
    });
}

document.addEventListener("click", () => {
    if (userMenu) userMenu.classList.remove("show");
    var nm = document.getElementById("notifMenu");
    if (nm) nm.classList.remove("notif-open");
});

                </script>
<script>
// ==============================
// 🔔 NOTIFICATIONS
// ==============================
(function(){
    var bellBtn  = document.getElementById('notifBellBtn');
    var badge    = document.getElementById('notifBadge');
    var menu     = document.getElementById('notifMenu');
    var list     = document.getElementById('notifList');
    var markAll  = document.getElementById('notifMarkAll');
    if (!bellBtn) return; // not logged in

    function timeAgo(d) {
        var s = (Date.now() - new Date(d)) / 1000;
        if (s < 60)    return 'just now';
        if (s < 3600)  return Math.floor(s/60) + 'm ago';
        if (s < 86400) return Math.floor(s/3600) + 'h ago';
        return Math.floor(s/86400) + 'd ago';
    }

    function loadCount() {
        fetch('notifications_api.php?action=get_count')
            .then(function(r){ return r.json(); })
            .then(function(d){
                var c = d.count || 0;
                if (c > 0) {
                    badge.textContent = c > 9 ? '9+' : c;
                    badge.style.display = 'flex';
                    bellBtn.classList.add('notif-has-new');
                } else {
                    badge.style.display = 'none';
                    bellBtn.classList.remove('notif-has-new');
                }
            }).catch(function(){});
    }

    function loadList() {
        list.innerHTML = '<div class="notif-loading"><div class="notif-spinner"></div></div>';
        fetch('notifications_api.php?action=get_list')
            .then(function(r){ return r.json(); })
            .then(function(d){
                var notifs = d.notifications || [];
                if (!notifs.length) {
                    list.innerHTML = '<div class="notif-empty">No notifications yet 🔔</div>';
                    return;
                }
                list.innerHTML = '';
                notifs.forEach(function(n){
                    var icon  = n.type === 'like' ? '❤️' : '💬';
                    var msg   = n.type === 'like'
                        ? ' liked your post'
                        : ' replied to your post';
                    var crown = n.is_premium ? ' 👑' : '';
                    var item  = document.createElement('a');
                    item.href = 'community.php';
                    item.className = 'notif-item' + (n.is_read ? '' : ' notif-unread');
                    item.innerHTML =
                        '<div class="notif-icon">' + icon + '</div>' +
                        '<div class="notif-content">' +
                            '<span class="notif-actor">' + n.actor + crown + '</span>' +
                            '<span class="notif-msg">' + msg + '</span>' +
                            '<div class="notif-post-title">' + n.post_title + '</div>' +
                            '<div class="notif-time">' + timeAgo(n.created_at) + '</div>' +
                        '</div>';
                    list.appendChild(item);
                });
            }).catch(function(){
                list.innerHTML = '<div class="notif-empty">Failed to load</div>';
            });
    }

    // Bell click
    bellBtn.addEventListener('click', function(e){
        e.stopPropagation();
        var isOpen = menu.classList.toggle('notif-open');
        if (isOpen) {
            loadList();
        }
        // close other menus always
        var um = document.getElementById('user-menu');
        var lm = document.getElementById('lang-menu');
        if (um) um.classList.remove('show');
        if (lm) lm.classList.remove('show');
    });

    // Mark all read
    if (markAll) {
        markAll.addEventListener('click', function(){
            fetch('notifications_api.php', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: 'action=mark_read'
            }).then(function(){
                badge.style.display = 'none';
                bellBtn.classList.remove('notif-has-new');
                document.querySelectorAll('.notif-unread').forEach(function(el){
                    el.classList.remove('notif-unread');
                });
            });
        });
    }

    // Close on outside click
    document.addEventListener('click', function(e){
        if (!document.getElementById('notifDropdown').contains(e.target)) {
            menu.classList.remove('notif-open');
        }
    });

    // Load count on page load + every 30s
    loadCount();
    setInterval(loadCount, 30000);
})();
</script>