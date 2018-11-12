
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

          //file: document.getElementById('photosIn'),
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

          //file: document.getElementById('photosOut'),
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

          if(obj[i].type == "in"){

            var dish = document.createTextNode(obj[i].dish);
            var time = document.createTextNode(obj[i].time);
            var ingredients = document.createTextNode(obj[i].ingredients);
            var cost = document.createTextNode(obj[i].cost);
            var instructions = document.createTextNode(obj[i].instructions);

            var dishNode = document.createElement("p");
            var timeNode = document.createElement("p");
            var ingredientsNode = document.createElement("p");
            var costNode = document.createElement("p");
            var instructionsNode = document.createElement("p");

            dishNode.appendChild(dish);
            timeNode.appendChild(time);
            ingredientsNode.appendChild(ingredients);
            costNode.appendChild(cost);
            instructionsNode.appendChild(instructions);

            var node = document.createElement("div");
            node.className = "jumbotron";
            node.appendChild(dishNode);
            node.appendChild(timeNode);
            node.appendChild(ingredientsNode);
            node.appendChild(costNode);
            node.appendChild(instructionsNode);
            document.getElementById("entries").append(node);
          }

          if(obj[i].type == "out"){

            var restaurant = document.createTextNode(obj[i].restaurant);
            var location = document.createTextNode(obj[i].location);
            var price = document.createTextNode(obj[i].price);
            var dish = document.createTextNode(obj[i].dish);
            var description = document.createTextNode(obj[i].description);

            var restaurantNode = document.createElement("p");
            var locationNode = document.createElement("p");
            var priceNode = document.createElement("p");
            var dishNode = document.createElement("p");
            var descriptionNode = document.createElement("p");

            restaurantNode.appendChild(restaurant);
            locationNode.appendChild(location);
            priceNode.appendChild(price);
            dishNode.appendChild(dish);
            descriptionNode.appendChild(description);

            var node = document.createElement("div");
            node.className = "jumbotron";
            node.appendChild(restaurantNode);
            node.appendChild(locationNode);
            node.appendChild(priceNode);
            node.appendChild(dishNode);
            node.appendChild(descriptionNode);
            document.getElementById("entries").append(node);
          }

        }

        alert(text);
      }
