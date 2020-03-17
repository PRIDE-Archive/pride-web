var CONNECT_INSTALLER =  "//d3gcli72yxqn2z.cloudfront.net/connect/v4";

var initAsperaConnect  = function () {
  /* This SDK location should be an absolute path, it is a bit tricky since the usage examples
   * and the install examples are both two levels down the SDK, that's why everything works
   */
  this.asperaWeb = new AW4.Connect({sdkLocation: CONNECT_INSTALLER, minVersion: "3.6.0"});
  var asperaInstaller = new AW4.ConnectInstaller({sdkLocation: CONNECT_INSTALLER});
  var statusEventListener = function (eventType, data) {
    if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.INITIALIZING) {
      asperaInstaller.showLaunching();
   } else if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.FAILED) {
     asperaInstaller.showDownload();
   } else if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.OUTDATED) {
     asperaInstaller.showUpdate();
   } else if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.RUNNING) {
     asperaInstaller.connected();
   }
  };
  asperaWeb.addEventListener(AW4.Connect.EVENT.STATUS, statusEventListener);
  asperaWeb.initSession();
  setup();
};


function toggle(showHideDiv, switchTextDiv, displayText) {
    var ele = document.getElementById(showHideDiv);
    var text = document.getElementById(switchTextDiv);
    if(ele.style.display == "block") {
            ele.style.display = "none";
        text.innerHTML = "Show " + displayText;
    }
    else {
        ele.style.display = "block";
        text.innerHTML = "Hide " + displayText;
    }
}

var setup = function () {

    var uploadButton;
    uploadButton = document.createElement('input');
    uploadButton.type = 'button';
    uploadButton.value = 'Upload Files';
    uploadButton.className = 'upload_button';
    uploadButton.setAttribute('onclick', 'asperaWeb.showSelectFileDialog({success:fileControls.uploadFiles})');
    document.getElementById('button_container').appendChild(uploadButton);

    this.asperaWeb.addEventListener('transfer', fileControls.handleTransferEvents);
};

var fileControls = {};

fileControls.handleTransferEvents = function (event, obj) {
    switch (event) {
        case 'transfer':
            document.getElementById('progress_meter').innerHTML = JSON.stringify(obj, null, 4);
            break;
    }
};

fileControls.uploadFiles = function (pathArray) {
    transferSpec = {
        "paths": [],
        "remote_host": "demo.asperasoft.com",
        "remote_user": "aspera",
        "remote_password": "demoaspera",
        "direction": "send",
        "target_rate_kbps" : 5000,
        "resume" : "sparse_checksum",
        "destination_root": "Upload"
    };

    connectSettings = {
        "allow_dialogs": "no"
    };
 	var files = pathArray.dataTransfer.files;
    for (var i = 0, length = files.length; i < length; i +=1) {
        transferSpec.paths.push({"source":files[i].name});
    }

    if (transferSpec.paths.length === 0) {
      return;
    }
    document.getElementById('transfer_spec').innerHTML = JSON.stringify(transferSpec, null, "    ");
    asperaWeb.startTransfer(transferSpec, connectSettings);
};

module.exports = initAsperaConnect;