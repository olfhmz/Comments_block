let comments = [];

// время
function timeConverter(curTime) {
	let timeStr = '';
	let a = new Date(curTime);
	let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	
	timeStr = `${year}-${month}-${date}, ${hour}:${min}`
	return (timeStr);
}

function hourTimeConverter(curTime) {
	let timeStr = '';

	let a = new Date(curTime);
	let hour = a.getHours();
	let min = a.getMinutes();

	timeStr = `${hour}:${min}`
	return (timeStr);
}

// ошибки
commentName.onchange = () => {
	if (commentName.value.length > 15) {
		commentName.classList.add('error');
	} else {
		commentName.classList.remove('error');
	}
};

commentBody.onchange = () => {
	if (commentBody.value.length > 40) {
		commentBody.classList.add('error');
	} else {
		commentBody.classList.remove('error');
	}
};

// показ комментариев
document.getElementById('comment-add').onclick = (event) => {
	event.preventDefault();
	let commentName = document.getElementById('commentName');
	let commentBody = document.getElementById('commentBody');


	let commentDate = document.getElementById('commentDate');
	
	function changeTime() {
		if (commentDate.value)
			return true;
		else
			return false;
	}


	let comment = {
		name : commentName.value,
		body : commentBody.value,
		time : Date.now(),
		changeBool : changeTime()
	}

	if (commentParse() == true)
		comments.push(comment);

	function commentParse() {
		if (!commentName.value || !commentBody.value) return false;
		if (commentName.value.length > 15) {
			alert('Name is too long');
			return false;
		}
		if (commentBody.value.length > 40) {
			alert('Comment is too long');
			return false;
		}
		return true;
	};
	
	commentName.value = '';
	commentBody.value = '';

	showComments();
}

function showComments() {
	let commentField = document.getElementById('comment-field');
	let output = '';
	let numberOfComments = 0;

	comments.forEach((item) => {

		item.index = numberOfComments;

		output += `<div id="${numberOfComments}" class="comment-content">`;

		if (item.changeBool == true) {
			output += `<p class="show-comment_time">${commentDate.value + ', ' + hourTimeConverter(item.time)}</p>`;
		} else {
			output += `<p class="show-comment_time">${timeConverter(item.time)}</p>`;
		}

		output += `<p class="show-comment_name">${item.name}</p>`;
		output += `<p class="show-comment_body">${item.body}</p>`;

		let likePic = document.createElement('img');
		likePic.setAttribute('src', './img/like.png');
		likePic.id = 'likePic';
		likePic.classList.add('likePic');
	
		let trashPic = document.createElement('img');
		trashPic.setAttribute('src', './img/trash.png');
		trashPic.id = 'trashPic';
		trashPic.classList.add('trashPic');

		output += likePic.outerHTML;
		output += trashPic.outerHTML;
		output += '</div>';

		numberOfComments++;
	})

	commentField.innerHTML = output;
}

// чекбокс
changeDate.onclick = () => {

	if (changeDate.checked) {
		commentDate.disabled = false;
		commentDate.style.backgroundColor = '';
	}
	if (!changeDate.checked) {
		commentDate.disabled = true;
		commentDate.style.backgroundColor = 'rgba(128, 128, 128, .5)';
	}
}

// кнопки
function redLike(like) {
	like.classList.toggle('red-like');
}

function removeComment(target) {
	let commentContent = target.parentNode;
	let index = commentContent.id;
	commentContent.parentNode.removeChild(commentContent);
	comments.splice(index, 1);
}

let commentField = document.getElementById('comment-field');
commentField.onclick = (event) => {
	if (event.target.classList.contains('likePic')) {
		redLike(event.target)
	}
	if (event.target.classList.contains('trashPic')) {
		removeComment(event.target);
	}
}
