var burst = function(info){ var obj = {
   bursts: [],
   html: {
      elements: document.querySelectorAll(info.selector),
      clicked: undefined
   },
   init: function(){
      this.listen();
   },
   listen: function(){
      var that = this;
      for(var i = 0; i < this.html.elements.length; i++){
         var ele = this.html.elements[i];
         ele.style.overflow = 'hidden';
         ele.addEventListener('mousedown', function(event){
            event.preventDefault();
            event.stopPropagation();
            that.createBurst(this, event.offsetX, event.offsetY);
         })
         ele.addEventListener('touchstart', function(event){
            event.preventDefault();
            event.stopPropagation();
            that.createBurst(this, event.clientX, event.clientY);
         })
         ele.addEventListener('mouseup', function(){that.cancelBurst()})
         ele.addEventListener('mouseout', function(){that.cancelBurst()})
         ele.addEventListener('touchend', function(){that.cancelBurst()})
      }
   },
   cancelBurst: function(){
      this.held = false;
      this.update();
   },
   createBurst: function(ele, x, y){
      this.held = true;
      var span = document.createElement('span')
      span.classList.add('burst')
      span.style.left = x + 'px'
      span.style.top = y + 'px'
      ele.appendChild(span);
      this.bursts.push({
         html: span,
         grow: false,
         removed: false,
         time:  Date.now()
      })
      var that = this;
      setTimeout(function(){ that.update() }, 0);
      setTimeout(function(){ that.update() }, 500);
   },
   update: function(){
      var that = this;
      this.bursts.forEach(function(burst){
         if(!burst.grow)
            that.grow(burst)
         
         if(Date.now() - burst.time > 450 && !burst.removed && !that.held){
            burst.html.classList.add('fade');
         }
      })
   },
   grow: function(burst){
      //Get the hypotnuse
      var a = burst.html.parentElement.offsetWidth; 
      var b = burst.html.parentElement.offsetHeight; 
      var c = Math.sqrt(a*a + b*b)*2;
      burst.html.style.width = c+'px';
      burst.html.style.height = c+'px';
      burst.html.classList.add('grow')
      burst.grow = true;
   }
}; obj.init(); return obj; }
