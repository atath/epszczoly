jQuery(document).ready(function() {
    window.sr = ScrollReveal();
    var duration = 2000;
    sr.reveal('.slide-from-left', {
        origin: 'left',
        duration: duration,
        scale: 1,
        distance: '200px',
    });
    sr.reveal('.slide-from-right', {
        origin: 'right',
        duration: duration,
        scale: 1,
        distance: '200px',
    });
    sr.reveal('.slide-from-left', {
        origin: 'left',
        duration: duration,
        scale: 1,
        distance: '200px',
    });
    sr.reveal('.slide-from-bottom-sequence', {
        origin: 'bottom',
        duration: duration,
        scale: 1,
        distance: '80px',
        opacity: 0
    }, 250);
    sr.reveal('.slide-from-top', {
        origin: 'top',
        duration: duration,
        scale: 1,
        distance: '80px',
    });
    sr.reveal('.fadein', {
        origin: 'bottom',
        duration: duration,
        scale: 1,
        distance: '0',
    });
    sr.reveal('.fadein-sequence', {
        origin: 'bottom',
        duration: duration,
        scale: 1,
        distance: '20px',
    }, 250);
});