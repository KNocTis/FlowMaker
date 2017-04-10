var testMode = false;
//var transparentImageUrl = testMode? "http://172.106.32.119/wp-content/uploads/2016/12/EEFA85-0.5.png" : "http://172.16.21.109/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png"
var transparentImageUrl = "/cpedia/wp-content/uploads/2016/12/NFFFFFF-0.png";

var maxWidth = 800; //depends on the max width of Wordpress post page

function htmlCodeForWPwithBlocks(blocks, image)
{
    //Protection
    if(blocks == undefined || blocks.length == 0){return};

    //
    console.log("blocks ", blocks);
    var scaleFactor = 1;
    if (maxWidth < image.width){
        scaleFactor =  maxWidth / image.width ;
//        console.log(blocks[0].canvas.width, scaleFactor);
    }

    let backgroundStr = "url(\'" + image.src + "\')"

    var aDiv = document.createElement('div');
    aDiv.className = "size-full";
    aDiv.style.width = image.width * scaleFactor + "px";
    aDiv.style.height = image.height * scaleFactor + "px";
    aDiv.style.backgroundImage = backgroundStr;
    aDiv.style.backgroundSize = image.width * scaleFactor + "px" + " " + image.height * scaleFactor + "px";

//    console.log("before: scalefoactor ", scaleFactor);
    if (blocks[0].canvas.width < image.width)
        scaleFactor *= image.width / blocks[0].canvas.width;
//    console.log("after: scalefoactor ", scaleFactor);
//    console.log(image.width, blocks[0].canvas.width, blocks);
    for (let i = 0; i < blocks.length; i++)
    {
        createElmentWithBlock(blocks[i], aDiv, scaleFactor, i);
    }

//    console.log(aDiv);
    // $('#htmlCode').val($('#htmlCode').val() + aDiv.outerHTML.replace(/&quot;/g, "\'"));
    return aDiv.outerHTML.replace(/&quot;/g, "\'");
    //console.log(aDiv);

}
//img/20161201182600.png

function createElmentWithBlock(block, aDiv, scaleFactor, index) {
    //position of bookmark will be handled with bookmark blocks
    //if (block.type == "ofBookmark") {return;}

    //
    let aA = document.createElement('a');
    //View part
    aA.style.position = "absolute";
    aA.style.marginLeft = block.left * scaleFactor + "px";
    aA.style.marginTop = block.top * scaleFactor + "px";

    //Data part
	$(aA).attr('data-block-type', block.type);

    if (block.type.includes("link")) {
        aA.href = block.url;
        aA.target = "_blank";
        if (block.type.includes("modal")) {
            $(aA).addClass("modal-link");
        }
    } else if (block.type == "bookmark") {
        let idOfBookmark = "bookmark" + index;
        aA.href = "#" + block.bookmark.uid;
        //addBookmarkPositionWithBlock(block.bookmark, aDiv, scaleFactor, idOfBookmark);
    } else if (block.type == "ofBookmark"){
        aA.id = block.uid;
    }



    let aImg = document.createElement('img');
    aImg.src = transparentImageUrl;
    aImg.style.width = block.getWidth() * scaleFactor + "px";
    aImg.style.height = block.getHeight() * scaleFactor + "px";

    aA.appendChild(aImg);

    aDiv.appendChild(aA);
}

function addBookmarkPositionWithBlock(block, aDiv, scaleFactor, id) {
    let aA = document.createElement('a');

    aA.style.position = "absolute";
    aA.style.marginLeft = block.left * scaleFactor + "px";
    aA.style.marginTop = block.top * scaleFactor + "px";

    aA.id = id;

    aDiv.appendChild(aA);

}

function createElmentInModalModeWithBlock (block, aDiv, scaleFactor) {

}
