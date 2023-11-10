// Basic

var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ]
  },
  placeholder: 'Enter Instruction for assignment',
  theme: 'snow'  // or 'bubble'
});


// With Tooltip

var quill = new Quill('#quill-tooltip', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ]
  },
  placeholder: 'Enter Description for this material',
  theme: 'snow'
});

// Enable all tooltips
$('[data-toggle="tooltip"]').tooltip();

// Can control programmatically too
$('.ql-italic').mouseover();
setTimeout(function () {
  $('.ql-italic').mouseout();
}, 2500);