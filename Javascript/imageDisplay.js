var first_of_all_images;
var first_image;
var last_image;
var search_value;

function displayImages(images)
{
    $("#page").removeClass("hidden")
    var to_add="\n<div class=\"image-row\">" ;
    var i=0;
    var j=0;
    array_j=[];
    var id_image;
    var element_image;
    images.forEach(function(subr){
        //console.log(subr);
        if(i<12 ){
            if(subr.data.thumbnail_height!=null){
    	        var postLink = "http://reddit.com"+subr.data.permalink;
                if(i!=0 && i%3==0)
                {
                    to_add+="\n<div class=\"image-row\">";
                }
                to_add+="\n <a href=\"";
                to_add+=postLink;
    	        to_add+="\"><div style=\"background-image: url(";
                to_add+= subr.data.thumbnail;
                to_add+="); background-position: center; background-size: cover; \" id=\"image_";
                to_add+=i;
                to_add+="\" class=\"image\">";
                to_add+="</div></a>";
                if(i%3==2)
                {
                    to_add+="\n</div>";
                }
                i++;
                array_j.push(j);
            }
            j++;
        }
    })
    if(i%3!=3)
    {
        to_add+="\n</div>" ;
    }
    $("#image-container").append(to_add);
    $("#image-container").append("<div id=\"source_web\"></div>")
    var x;
    var y;
    var title;
    //console.log(array_j);
    /*element_image=document.getElementById("image_0");
        element_image.addEventListener('mousemove', function(e) {
            x = e.clientX+"px";
            y = e.clientY+"px";
            $("#source_web").empty();
            $("#source_web").append("<div id=\"source_web\">"+images[array_j[0]].data.title+"</div>");
            $("#source_web").css("left",x);
            $("#source_web").css("top",y);
            $("#source_web").css("color","blue");
        });
    element_image=document.getElementById("image_1");
        element_image.addEventListener('mousemove', function(e) {
            x = e.clientX+"px";
            y = e.clientY+"px";
            $("#source_web").empty();
            $("#source_web").append("<div id=\"source_web\">"+images[array_j[1]].data.title+"</div>");
            $("#source_web").css("left",x);
            $("#source_web").css("top",y);
            $("#source_web").css("color","blue");
        });*/
    console.log(images.length);
    for(var k=0;k<5;k++)
    {
        console.log("k:"+k);
        id_image="image_"+k;
        console.log(id_image);
        console.log(array_j[k]);
        element_image=document.getElementById(id_image);
        element_image.addEventListener('mousemove', function(e) {
            x = e.clientX+"px";
            y = e.clientY+"px";
            $("#source_web").empty();
            console.log(images[array_j[k]].data.title);
            $("#source_web").append("<div id=\"source_web\">"+images[array_j[k]].data.title+"</div>");
            $("#source_web").css("left",x);
            $("#source_web").css("top",y);
            $("#source_web").css("color","blue");
        });
    }
    first_image=images[0].data.name;
    last_image=images[j-1].data.name;
}

$("#searchForm").submit(function(){
    $("#image-container").empty();
    $("#previous").addClass("hidden");
    searchValue = $('#search').val();
    reddit.hot(searchValue).limit(50).fetch(function(res){
        displayImages(res.data.children);
    },function(err){
        $("#page").addClass("hidden")
        $("#image-container").append(
        "<h1 class =\"text-center\">Your search did not match any images </h1>");
    });
    first_of_all_images=first_image;
    return false;
});

$("#next").click(function() {
        $("#image-container").empty();
        $("#page").removeClass("hidden");
        $("#previous").removeClass("hidden");
        reddit.hot(searchValue).limit(50).after(last_image).fetch(function(res) {
        displayImages(res.data.children);
    });
});

$("#previous").click(function() {
        $("#image-container").empty();
        $("#page").removeClass("hidden");
        reddit.hot(searchValue).limit(50).before(first_image).fetch(function(res) {
            res.data.children.reverse();
            var images=[];
            var i=0;
            while(images.length<12)
            {
                if(res.data.children[i].data.thumbnail_height!=null)
                {
                   images.unshift(res.data.children[i]);
                }
                i++;
            }
            displayImages(images);
    });
    if(first_image=first_of_all_images)
    {
        $("#previous").addClass("hidden");
    }
});

