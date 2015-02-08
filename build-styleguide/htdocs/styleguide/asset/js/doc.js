$(function(){

  $('.sg-selectLink').on('change', function(){
    var val = $(this).val();
    location.href = val;
  });

});
