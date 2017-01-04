

            //load page configuration
            $(document).ready(function(){
                
                
                
                if (localStorage.sList!=null) getListFromStorage();
                
            
            })

            $(document).on('click', 'li', function(){
                if ($(this).hasClass("bought"))
                    {
                    $(this).removeClass("bought");
                    $(this).addClass("tobuy");
                    }
                else
                    {
                    $(this).removeClass("tobuy");
                    $(this).addClass("bought");
                    } 
                localStorage.sList = collectData();
            });

            $(document).on('taphold', 'li', function(){
                
                if ($(this).hasClass("todelete"))
                    {
                    $(this).removeClass("todelete");
                    $(this).addClass("nondelete");
                    
                    }
                else
                    {
                    $(this).removeClass("nondelete");
                    $(this).addClass("todelete");
                    alert("Press 'Delete' to remove item")
                    }
                //localStorage.sList = collectData();
            });


            //itemAdded button on item_page configuration
            function itemAdded() {
                
                var item = $("#filterBasic-input").val();
                var quantity = $("#spin").val();
                
                var category = $("#select-native-1").val();
                var list = "<li>" + item + " : " + quantity + "</li>";
                  
      
                var form = document.getElementById("inputItem");
                form.reset();

             

                if(item.length>0 && quantity>0)
                {
                    //Alert the user that the item has been added
                    alert($(list).text() + " has been added to your list" ) 
                }
                
                else{
                
                    alert("Please enter item name")
                    list=""
                }
                                
                //Add the item to the shopping list on main_page
                $("#shoppinglist").append(list);

                //save the item on local storage
                localStorage.sList = collectData();

               
            }

            //Collect item for local storage
            function collectData() {

                var jList = [];
                $("#shoppinglist").children("li").each(function() {
                var s = $(this).text(); //(this will give us item + quantity
                var boughtOrNot = $(this).hasClass("bought");
                var thisItem = {};
                thisItem.itemQuantity = s;
                thisItem.bought = boughtOrNot;
                jList.push(thisItem);
                });
                return JSON.stringify(jList);

            }

            //Retrieve list from local storage
            function getListFromStorage() {

                var stringList = localStorage.sList;
                var jsonList = JSON.parse(stringList);
                $.each(jsonList, function(i, groceryItem) {
                var li;
                if (groceryItem.bought)
                {
                li = "<li class='bought'>" + groceryItem.itemQuantity +  "</li>";   
                }
                else
                {
                li =  "<li>" + groceryItem.itemQuantity +  "</li>";     
                }

                $("#shoppinglist").append(li);

                });
                $('.firsttimetext').empty();
            }


            //shopping list button on item_page configuration
            function goToList(){
                
                    var form = document.getElementById("inputItem");
                    $.mobile.changePage("#main_page");
                    $('.firsttimetext').empty();
                    form.reset();
                
            }

            //remove item button
            function removeItem(){
                
                $("button").click(function(){
                   $('#shoppinglist .todelete').remove();
                   

                    localStorage.sList = collectData();
                    
                
                });
                
                //$("#shoppinglist").listview("refresh");
                
                

            }
            
            
            //clear list button
            function clearList(){
                $("button").click(function(){
                        $("ul").remove(".list");
                    });
                localStorage.clear();
                location.reload();
            }
                

            

            
    