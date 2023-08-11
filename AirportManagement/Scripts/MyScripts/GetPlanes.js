$(function () {
    
    
    //Detect changes in the email field
    $("#GetAvailablePlanes").click(function () {
        var selectedRadio = $("input[name='Book']:checked");

        if (selectedRadio.length > 0) {
            var HangerId = $("#Book").val();
            //alert(email);
            // Perform validation or other checks if needed
            // Then send the email value to the controller using AJAX
            alert(HangerId);
            var fromdate = $("input[name='fromdate']").val();
            var todate = $("input[name='todate']").val();
            alert(fromdate + todate);
            alert($("input[name='L" + HangerId + "']").val());

            $.ajax({
                url: "/Hanger/GetPlanes?FromDate=" + fromdate + "&ToDate=" + todate,
                type: 'Get',
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    var successModel = $("#successModal");
                    var modalBody = $('#successModal .modal-body');
                    modalBody.empty();

                    if (data != null && data.length > 0) {
                        var location = "<p>" + $("input[name='L" + HangerId + "']").val() + "</p>";
                        var capacity = "<p>" + HangerId + "</p>";

                        modalBody.append(location);
                        modalBody.append(capacity);

                        modalBody.append("<p class='d-none text-danger'id='selectPlane'>Required</p>");
                        var select = $("<select name='SelectedPlaneId' class='form-control' id='selectPlaneId'><option value=' '>Select a plane</option></select>");

                        for (var i = 0; i < data.length; i++) {
                            select.append("<option value='" + data[i].PlaneId + "'>" + data[i].PlaneId + "</option>");
                        }

                        modalBody.append(select);
                        $('#errorModal').modal('hide');
                        $('#successModal').modal('show');
                    }
                    else {
                        var modalBody = $('#errorModal .modal-body');
                        modalBody.empty();
                        modalBody.append("No Plane Available between " + fromdate + " to " + todate);
                        $('#successModal').modal('hide');
                        $('#errorModal').modal('show');
                    }
                },
                error: function (x, err) {
                    var modalBody = $('#errorModal .modal-body');
                    modalBody.empty();
                    modalBody.append("Error occured unable to book hanger");
                    $('#successModal').modal('hide');
                    $('#errorModal').modal('show');
                    alert(x.readyState);
                    alert(x.responseText);



                }

            });
        }
        else {
            var modalBody = $('#errorModal .modal-body');
            modalBody.empty();
            modalBody.append("please select a hanger");
            $('#successModal').modal('hide');
            $('#errorModal').modal('show');
        }
    });
    $("#BookHanger").click(function () {
        alert("hiii");
        if ($("#selectPlaneId").val() == " ") {
            $("#selectPlane").removeClass("d-none");
        }
        else {
            $("#selectPlane").addClass("d-none");
            var fromdate = $("input[name='fromdate']").val();
            var todate = $("input[name='todate']").val();
            var planeId = $("#selectPlaneId").val()
            
            var selectedRadio = $("input[name='Book']:checked");
            var hangerId = selectedRadio.val();
            var jsonObject = {
                "fromdate": fromdate,
                "todate": todate,
                "planeId": planeId,
                "hangerId": hangerId
            };
            $.ajax({
                url: "/Hanger/BookHanger",
                type: 'Post',
                dataType: "json",
                data: JSON.stringify(jsonObject),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    var modalBody = $('#errorModal .modal-body');
                    modalBody.empty();
                    modalBody.append("<p>" + data + "</p>");
                    $('#successModal').modal('hide');
                    $("#errorModal").modal('show');

                },
                error: function (x, err) {
                    var modalBody = $('#errorModel .modal-body');
                    modalBody.empty();
                    modalBody.append("<p>unable to book</p>")
                    $('#successModal').modal('hide');
                    $("#errorModal").modal('show');
                }
            });
            
            
       }
    })
    //select.on("click",function () {
    //    alert("Hi");
    //    var fromdate = $("input[name='fromdate']").val();
    //    var todate = $("input[name='todate']").val();
    //    alert(fromdate + todate);
    //        $.ajax({
    //            url: "/Hanger/GetPlanes?FromDate=" + fromdate + "&ToDate=" + todate,
    //            type: 'Get',
    //            dataType: "json",
    //            contentType: "application/json;charset=utf-8",
    //            success: function (data) {
    //                var successModel = $("#successModal");
    //                var modalBody = $('#successModal .modal-body');
    //                select.empty();

    //                if (data != null) {



    //                    alert(data.length);
                        
    //                    select.append("<option value=' '>Select a plane</option>")
    //                    for (var i = 0; i < data.length; i++) {
    //                        select.append("<option value='" + data[i].PlaneId + "'>" + data[i].PlaneId + "</option>");
    //                    }


    //                    $('#errorModal').modal('hide');
                        
    //                }
    //                else {
    //                    var modalBody = $('#errorModal .modal-body');
    //                    modalBody.append("No Plane Available between " + fromdate + " to " + todate);
    //                    $('#successModal').modal('hide');
    //                    $('#errorModal').modal('show');
    //                }
    //            },
    //            error: function (x, err) {
    //                var modalBody = $('#errorModal .modal-body');
    //                modalBody.append("No Plane Available between " + fromdate + " to " + todate);
    //                $('#successModal').modal('hide');
    //                $('#errorModal').modal('show');
    //                alert(x.readyState);
    //                alert(x.responseText);



    //            }

    //        });
    //});
    //$("#selectPlaneId").click(function () {
    //    alert("hi");
    //    //var fromdate = $("input[name='fromdate']").val();
    //    //var todate = $("input[name='todate']").val();
    //    //alert(fromdate + todate);
    //    //    $.ajax({
    //    //        url: "/Hanger/GetPlanes?FromDate=" + fromdate + "&ToDate=" + todate,
    //    //        type: 'Get',
    //    //        dataType: "json",
    //    //        contentType: "application/json;charset=utf-8",
    //    //        success: function (data) {
    //    //            var successModel = $("#successModal");
    //    //            var modalBody = $('#successModal .modal-body');
    //    //            modalBody.empty();

    //    //            if (data != null) {
                        

                        
                        
    //    //                $("#SelectedPlaneId").empty();
    //    //                select.append("<option value=' '>Select a plane</option>")
    //    //                for (var i = 0; i < data.length; i++) {
    //    //                    select.append("<option value='" + data[i].PlaneId + "'>" + data[i].PlaneId + "</option>");
    //    //                }

                        
    //    //                $('#errorModal').modal('hide');
    //    //                $('#successModal').modal('show');
    //    //            }
    //    //            else {
    //    //                var modalBody = $('#errorModal .modal-body');
    //    //                modelBody.append("No Plane Available between " + fromdate + " to " + todate);
    //    //                $('#successModal').modal('hide');
    //    //                $('#errorModal').modal('show');
    //    //            }
    //    //        },
    //    //        error: function (x, err) {
    //    //            var modalBody = $('#errorModal .modal-body');
    //    //            modalBody.append("No Plane Available between " + fromdate + " to " + todate);
    //    //            $('#successModal').modal('hide');
    //    //            $('#errorModal').modal('show');
    //    //            alert(x.readyState);
    //    //            alert(x.responseText);



    //    //        }

    //    //    });
    //})
})
