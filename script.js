
      function showAteIn(){

        document.getElementById('ateIn').style.display = 'block';
        document.getElementById('ateOut').style.display = 'none';
      }

      function showAteOut(){

        document.getElementById('ateOut').style.display = 'block';
        document.getElementById('ateIn').style.display = 'none';
      }

      function clearForms(){

          document.getElementById('ateIn').reset();
          document.getElementById('ateOut').reset();
      }

      function newAteInEntry(){

        var obj = {

          type: document.getElementById('ateIn').name,
          dish: document.getElementById('dishIn').value,
          time: document.getElementById('time').value,
          ingredients: document.getElementById('ingredients').value,
          cost: document.getElementById('cost').value,
          instructions: document.getElementById('instructions').value
        }

        sendFood(obj);
      }

      function newAteOutEntry(){

        var obj = {

          type: document.getElementById('ateOut').name,
          restaurant: document.getElementById('restaurant').value,
          location: document.getElementById('location').value,
          price: document.getElementById('price').value,
          dish: document.getElementById('dishOut').value,
          description: document.getElementById('description').value
        }

        sendFood(obj);
      }

      function sendFood(foodObj){

        var myJSON = JSON.stringify(foodObj);

        alert(myJSON);

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "/create_food", true);
        //used application/json because i'm sending json.
        //otherwise use x-www-form-urlencoded
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(myJSON);
      }

      function retrieveFood(){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
      
                //alert(this.responseText); //this works if responseType is not specified.
                alert(this.response);
                createNode(this.response);
           }
        };
        //this makes sure that the response from the server is JSON.
        xhttp.responseType = "json";
        xhttp.open("POST", "/getDB", true);
        xhttp.send();
      }

      function createNode(DBresult){

        var obj = JSON.parse(DBresult);

        var text = "";

        var i = 0;

        for(i in obj){

          text += "entry " + i + '\n'

          for(var j = 0 in obj[i]){
            text += obj[i][j] + '\n';
          }

          text += '\n';
        }


        alert(text);

      }

      /*
      var dish;
      var time;
      var ingredients;
      var description;
      var price;
      var location;
      var photo;

      var formInput = [];
      var formNodes = [];

      function newAteInEntry(){

        //photo = document.getElementById('photos').value;
        dish = document.getElementById('dishIn').value;
        time = document.getElementById('time').value;
        ingredients = document.getElementById('ingredients').value;
        price = document.getElementById('cost').value;
        description = document.getElementById('instructions').value;

        var dishContent = document.createTextNode(dish);
        var timeContent = document.createTextNode(time);
        var ingredientsContent = document.createTextNode(ingredients);
        var priceContent = document.createTextNode(price);
        var descriptionContent = document.createTextNode(description);

        var dishNode = document.createElement("p");
        var timeNode = document.createElement("p");
        var ingredientsNode = document.createElement("p");
        var priceNode = document.createElement("p");
        var descriptionNode = document.createElement("p");

        dishNode.appendChild(dishContent);
        timeNode.appendChild(timeContent);
        ingredientsNode.appendChild(ingredientsContent);
        priceNode.appendChild(priceContent);
        descriptionNode.appendChild(descriptionContent);

        var node = document.createElement("div");
        node.className = "jumbotron";
        node.appendChild(dishNode);
        node.appendChild(timeNode);
        node.appendChild(ingredientsNode);
        node.appendChild(priceNode);
        node.appendChild(descriptionNode);
        document.getElementById("entries").prepend(node);

        dish, time, ingredients, price, description = "";
      }
      */
