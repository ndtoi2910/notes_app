const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');

const popupTitle = document.querySelector('header p');


const closeIcon = document.querySelector('header i');
const addBtn = document.querySelector('button');

const titleTag = document.querySelector('input');
const descTag = document.querySelector('textarea');



var months = ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', ' September', 'October', 'November', 'December'];

// lấy notes ở bộ nhớ cục bộ nếu chúng tồn tại và chuyển n thành đối tượng js nếu không thì chuyển 1 mảng trống thành notes
const notes = JSON.parse(localStorage.getItem('notes') ||'[]' );
let isUpdate = false, updateId;

addBox.addEventListener('click', () => {
    titleTag.focus(); //luôn có con trỏ chuột ở phần title
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    titleTag.value = '';
    descTag.value = '';

    popupTitle.innerText = 'Add a new Note';
    addBtn.innerText = 'Add Note';

    popupBox.classList.remove('show');
});

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove()); //xóa tất cả những notes trc kia mình đã viết trước khi thêm 1 cái mới (nếu không có dòng này thì khi mình rết lại trang sẽ vẫn còn những cái đầu tiên)

    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="ti-more-alt"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, ${note.title}, ${note.description})"><i class="ti-pencil"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="ti-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();
function showMenu(element) {
    element.parentElement.classList.add("show");
    document.addEventListener('click', e => {
        if(e.target != element) {
            element.parentElement.classList.remove("show");
        }
        // console.log(e.target)
        // console.log(element)
    })
}

function deleteNote(nodeId) {
    var confirmDel = confirm("Are you sure you want to delete this node?");
    if(!confirmDel) return; 

    notes.splice(nodeId, 1);
    // lưu lại notes còn lại khi mình vừa xóa ở trên  từ (vào) bộ nhớ cục bộ
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(nodeId, title, desc){
    isUpdate = true;
    updateId= nodeId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    popupTitle.innerText = 'Update a Note';
    addBtn.innerText = 'Update Note';
    // console.log(nodeId, title, desc);
    showNotes();
}

addBtn.addEventListener('click', (e) => {
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        //lấy ngày tháng năm của hiện tại
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate) {  
             notes.push(noteInfo); // thêm note mới vào notes
        }else { 
            notes[updateId] = noteInfo;// gán cái phẩn tử muốn sửa thành cái ptu mình sửa rồ
        }
        // lưu notes từ (vào) bộ nhớ cục bộ
        localStorage.setItem("notes", JSON.stringify(notes)); //chuyển đổi đối tượng thành chuỗi để lưu trữ trong bộ nhớ cục bộ
        closeIcon.click();
        showNotes();
    }
    // console.log(noteTitle, noteDesc);
});


