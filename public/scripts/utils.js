// This file contains javascripts that is called in front-end by the pages.

// event is fired on page load, to calculate the age in words
// document.addEventListener('DOMContentLoaded', function () {
// add code here...
// });

// load image to the preview image element
function previewImage(inputElem, previewElem) {
  let file = document.getElementById(inputElem).files;
  // validate file size before preview
  if (fileSizeValidation(inputElem, previewElem) === false) {
    return;
  }
  if (fileTypeValidation(inputElem) === false) {
    return;
  }
  if (file.length > 0) {
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(previewElem).setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(file[0]);
  }
}

// File size validation utility
function fileSizeValidation(elemName, elemImg, maxSize = 2) {
  // console.log(elemName, elemImg);
  // maxSize = 2;
  const fi = document.getElementById(elemName);
  // Check if any file is selected.
  if (fi.files.length > 0) {
    for (const i = 0; i <= fi.files.length - 1; i++) {
      const fsize = fi.files.item(i).size;
      const file = Math.round(fsize / 1024);
      // The size of the file.
      // console.log(file);
      if (file >= maxSize * 1024) {
        alert(`File too Big, please select a file less than ${maxSize} mb`);
        fi.value = '';
        document.getElementById(elemImg).setAttribute('src', '');
        return false;
      } else {
        return true;
      }
    }
  }
}

// File type validation utility
function fileTypeValidation(elemName) {
  let fileInput = document.getElementById(elemName);
  let filePath = fileInput.value;

  // Allowing file type
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(filePath)) {
    alert('Invalid file type');
    fileInput.value = '';
    return false;
  } else {
    return true;
  }
}

// gender required checking
function isGenderOK() {
  var gender = document.getElementById('gender');
  if (gender.selectedIndex <= 0) {
    alert('Please select gender');
    return false;
  }
}

// documents upload validation
function isUploadOk() {
  var picFile = document.getElementById('photo_upload');
  var repFile = document.getElementById('report_upload');
  var decFile = document.getElementById('decl_upload');
  if (picFile.value === null || picFile.value === '' || repFile.value === null || repFile.value === '') {
    alert('Please select your photo and documents for uploading');
    return false;
  } else {
    // check for valid extensions
    if (ValidateFileExt(document) === false) {
      return false;
    }
  }
}

// function to check only valid files are selected for upload
function ValidateFileExt(oForm) {
  let _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png'];
  let arrInputs = oForm.getElementsByTagName('input');
  for (let i = 0; i < arrInputs.length; i++) {
    let oInput = arrInputs[i];
    if (oInput.type == 'file') {
      let sFileName = oInput.value;
      if (sFileName.length > 0) {
        let blnValid = false;
        for (let j = 0; j < _validFileExtensions.length; j++) {
          let sCurExtension = _validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          alert('Sorry, ' + sFileName + ' is invalid, allowed extensions are: ' + _validFileExtensions.join(', '));
          return false;
        }
      }
    }
  }
  return true;
}

function calculateAge(birthday, objID) {
  var now = new Date('30/Sept/2021');

  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var dob = new Date(birthday);

  var yearDob = dob.getYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();

  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
  let obj = document.getElementById(objID);
  age = yearAge + ' years ' + monthAge + ' months ' + dateAge + ' days';
  obj.value = age;
  console.log('NOW:', now, 'DOB:', dob, 'AGE:', age);
}

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}
