var $win = $(window);
var $stat = $('.to-animate');
var $height =- $(window).height();
$win.on('scroll', function () {
  var scrollTop = $win.scrollTop();
  $stat.each(function () {
    var $self = $(this);
    var prev=$self.offset();
    if ( (scrollTop - prev.top) > $height) {
      if ($self.hasClass("animate-left"))
        $self.css('opacity', '1').addClass('animate__animated animate__fadeInLeft');
      if ($self.hasClass("animate-right"))
        $self.css('opacity', '1').addClass('animate__animated animate__fadeInRight');
      if ($self.hasClass("animate-zoom"))
        $self.css('opacity', '1').addClass('animate__animated animate__zoomIn');
      if ($self.hasClass("animate-bottom"))
        $self.css('opacity', '1').addClass('animate__animated animate__fadeInDown');
    }
  });
}).scroll();