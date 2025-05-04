var globalDB = [];





function toggleArrowUp(e) {
    console.log("Hello");
    $(e).removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(e).parent().next().hide();
    $(e).attr('onclick', 'toggleArrowDown(this)');
}
function toggleArrowDown(e) {
    console.log("Hello");
    $(e).removeClass('fa-chevron-down').addClass('fa-chevron-up');
    $(e).parent().next().show();
    $(e).attr('onclick', 'toggleArrowUp(this)');
}

function tCount(event, tchar) {
    console.log("check");
    var remaining = tchar - $(event).val().length;
    $(event).nextAll()[1].innerHTML = remaining;

}

function addData(event) {

    var date = $(event).prevAll()[17].value;
    var name = $(event).prevAll()[14].value;
    var stime = $(event).prevAll()[9].value;
    var etime = $(event).prevAll()[6].value;
    var desc = $(event).prevAll()[3].value;

    if (etime <= stime) {
        alert('Select Correct Start or End Time!!');
        return
    }

    var singleRecord = [];

    singleRecord.push(date);
    singleRecord.push(name);
    singleRecord.push(stime);
    singleRecord.push(etime);
    singleRecord.push(desc);

    globalDB.push(singleRecord)

    // session storage
    var allRecord = [];
    try {
        var prevRecord = localStorage.getItem("Record", allRecord).split(',');
        allRecord.push(prevRecord);
    }
    catch (err) {

    }
    allRecord.push(singleRecord);
    localStorage.setItem("Record", allRecord);

    loaddata();

}

function loaddata() {

    var x = localStorage.getItem('Record').split(',');
    var allRecords = [];

    for (let i = 0; i < x.length; i += 5) {
        allRecords.push(x.slice(i, i + 5));
    }


    var boxValue = '';


    for (let i = 0; i < allRecords.length; i++) {


        var eventDate = allRecords[i][0];
        var eventName = allRecords[i][1];
        var eventSTime = allRecords[i][2];
        var eventETime = allRecords[i][3];
        var eventDesc = allRecords[i][4];

        boxValue += '<p class="view-Time">' + eventDate + '</p><div id="box" class="box1"><div class="delbun" onclick="delCard(' + i + ')"><p><i class="material-icons" style="font-size:22px" id="delButton">delete</i></p></div><p class="boxText"><b>&#9733 ' + eventSTime + ' to ' + eventETime + '</b></p><p>' + eventName + '</p><p class="downarrow"> <i class="fa fa-chevron-up" style="font-size:24px" onclick=" toggleArrowUp(this)"></i></p><p class="description">' + eventDesc + '</p></div>'

    }


    if (localStorage.getItem('Record') == '') {
        var boxValue = '';
        $('#BoxContainer').html(boxValue);
        localStorage.removeItem('Record');
    }

    $('#BoxContainer').html(boxValue);

}


function getData(event1) {
    console.log("hello");

    var searchDate = $(event1).prevAll()[0].value;

    var x = localStorage.getItem('Record').split(',');
    var allRecords = [];

    for (let i = 0; i < x.length; i += 5) {
        allRecords.push(x.slice(i, i + 5));
    }

    var boxValue = '';
    $('#BoxContainer').html(boxValue);

    for (let i = 0; i < allRecords.length; i++) {

        if (allRecords[i][0] == searchDate) {
            var eventDate = allRecords[i][0];
            var eventName = allRecords[i][1];
            var eventSTime = allRecords[i][2];
            var eventETime = allRecords[i][3];
            var eventDesc = allRecords[i][4];


            boxValue += '<p class="view-Time">' + eventDate + '</p><div id="box" class="box1"><div class="delbun" onclick="delCard(' + i + ')"><p><i class="material-icons" style="font-size:22px" id="delButton" >delete</i></p></div><p class="boxText"><b>&#9733 ' + eventSTime + ' to ' + eventETime + '</b></p><p>' + eventName + '</p><p class="downarrow"> <i class="fa fa-chevron-up" style="font-size:24px" onclick=" toggleArrowUp(this)"></i></p><p class="description">' + eventDesc + '</p></div>'

            $('#BoxContainer').html(boxValue);

        }

    }


}


function delCard(i) {

    var x = localStorage.getItem('Record').split(',');
    var allRecords = [];

    for (let i = 0; i < x.length; i += 5) {
        allRecords.push(x.slice(i, i + 5));
    }

    allRecords.splice(i, 1);


    localStorage.setItem("Record", allRecords);
    var boxValue = '';
    for (let i = 0; i < allRecords.length; i++) {


        var eventDate = allRecords[i][0];
        var eventName = allRecords[i][1];
        var eventSTime = allRecords[i][2];
        var eventETime = allRecords[i][3];
        var eventDesc = allRecords[i][4];

        boxValue += '<p class="view-Time">' + eventDate + '</p><div id="box" class="box1"><div class="delbun" onclick="delCard(' + i + ')"><p><i class="material-icons" style="font-size:22px" id="delButton">delete</i></p></div><p class="boxText"><b>&#9733 ' + eventSTime + ' to ' + eventETime + '</b></p><p>' + eventName + '</p><p class="downarrow"> <i class="fa fa-chevron-up" style="font-size:24px" onclick=" toggleArrowUp(this)"></i></p><p class="description">' + eventDesc + '</p></div>'

    }

    $('#BoxContainer').html(boxValue);

    loaddata();






}