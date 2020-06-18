function rev(theme) {
    return theme === 'light' ? 'dark' : 'light';
}

function code(theme) {
    return theme === 'light' ? 'light' : 'dark';
}

// get current theme
function getNowTheme() {
    let nowTheme = document.body.getAttribute('data-theme');
    if (nowTheme === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        return nowTheme === 'dark' ? 'dark' : 'light';
    }
}

// update utterances theme
function updateUtterancesTheme(utterancesFrame) {
    let targetTheme = getNowTheme();
    if (utterancesFrame) {
        if (targetTheme === 'dark') {
            utterancesFrame.contentWindow.postMessage(
                {
                    type: 'set-theme',
                    theme: 'photon-dark',
                },
                'https://utteranc.es'
            );
        } else {
            utterancesFrame.contentWindow.postMessage(
                {
                    type: 'set-theme',
                    theme: 'github-light',
                },
                'https://utteranc.es'
            );
        }
    }
}

// theme control button
var theme_btn = document.getElementById('theme-btn');
if (theme_btn) {
    theme_btn.addEventListener('click', () => {
        let current_theme = document.body.getAttribute('data-theme');
        document.body.setAttribute('data-theme', rev(code(current_theme)));
        theme_btn.classList.toggle('dark');
        theme_btn.classList.toggle('light');

        // let nowTheme = getNowTheme();
        // let domTheme = document.body.getAttribute('data-theme');
        // let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
        // if (domTheme === 'auto') {
        //     // if now in auto mode, switch to user mode
        //     document.body.setAttribute('data-theme', nowTheme === 'light' ? 'dark' : 'light');
        //     localStorage.setItem('fuji_theme', nowTheme === 'light' ? 'dark' : 'light');
        // } else if (domTheme === 'light') {
        //     // if now in user mode and light mode
        //     document.body.setAttribute('data-theme', 'dark');
        //     // if the theme want to switch is system theme
        //     localStorage.setItem('fuji_theme', systemTheme === 'dark' ? 'auto' : 'dark');
        // } else {
        //     // if now in user mode and dark mode
        //     document.body.setAttribute('data-theme', 'light');
        //     // if the theme want to switch is system theme
        //     localStorage.setItem('fuji_theme', systemTheme === 'light' ? 'auto' : 'light');
        // }
    
        // // switch comment area theme
        // // if this page has comment area
        // let commentArea = document.querySelector('.post-comment');
        // if (commentArea) {
        //     // if comment area loaded
        //     if (document.querySelector('span.post-comment-notloaded').getAttribute('style')) {
        //         if (commentArea.getAttribute('data-comment') === 'utterances') {
        //             updateUtterancesTheme(document.querySelector('.post-comment iframe'));
        //         }
        //         if (commentArea.getAttribute('data-comment') === 'disqus') {
        //             DISQUS.reset({
        //                 reload: true,
        //             });
        //         }
        //     }
        // }

    });
}