<script>
$(document).ready(function(){
   var player = videojs('video1');    
   var myButton = player.controlBar.addChild('button', {
            text: "Press me",
            // other options
          });

   myButton.addClass("html-classname");
});
</script>
