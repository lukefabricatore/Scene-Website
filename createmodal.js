window.addEventListener('DOMContentLoaded', setupModals);

function setupModals() {
	createProjects();
	document.querySelector('#modal_close').addEventListener('click', closeModal, false);
	document.querySelector('#project_modal button.exit_button').addEventListener('click', closeModal, false);
}

function createProjects() {
	const container = document.querySelector('.projects_container');
	for (const project of projects) {
		const button = document.createElement('button');
		button.classList.add('project');
		button.setAttribute('project_id', project.id);

		// Create a group for the viewport corners
		const span = document.createElement('span');
		for (let i = 0; i < 4; i++) {
			const img = document.createElement('img');
			img.classList.add('vp');
			img.src = 'assets/viewport_vector.svg';
			span.appendChild(img);
		}
		// Create the action_popout div
		const actionPopout = document.createElement('div');
		actionPopout.classList.add('action_popout');

		// Add the project thumbnail image
		const thumbImg = document.createElement('img');
		thumbImg.src = `projects/${project.id}/thumb.webp`;
		thumbImg.alt = project.title;
		actionPopout.appendChild(thumbImg);

		// Add the diagonals div
		const actionLander = document.createElement('div');
		actionLander.classList.add('action_lander');
		actionPopout.appendChild(actionLander);

		// Create the text_slider
		const textSlider = document.createElement('div');
		textSlider.classList.add('text_slider');
		const textSliderMover = document.createElement('div');
		textSliderMover.classList.add('text_slider_mover');

		// Add the two h5 elements with project title
		const h5_1 = document.createElement('h5');
		h5_1.textContent = project.title;
		const h5_2 = document.createElement('h5');
		h5_2.textContent = project.title.toUpperCase();
		textSliderMover.appendChild(h5_1);
		textSliderMover.appendChild(h5_2);

		textSlider.appendChild(textSliderMover);
		actionPopout.appendChild(textSlider);
		button.appendChild(span);
		button.appendChild(actionPopout);

		button.addEventListener('click', createModal, false);
		container.appendChild(button);
	}
}

function createModal(event) {
	const ct = event.currentTarget;
	const container = document.querySelector('#project_modal');
	const containerInner = container.querySelector('div.content');
	const id = ct.getAttribute('project_id');
	const projectData = data[id];
	const modalCloser = document.querySelector('#modal_close');
	containerInner.innerHTML = '';
	for (item of projectData) {
		let element = '';
		if (!item.type) continue;
		if (item.type === 'h1') {
			element = document.createElement('h1');
			element.textContent = item.content;
		} else if (item.type === 'h2') {
			element = document.createElement('h2');
			element.textContent = item.content;
		} else if (item.type === 'h3') {
			element = document.createElement('h3');
			element.textContent = item.content;
		} else if (item.type === 'p') {
			element = document.createElement('p');
			element.textContent = item.content;
			if (item.desc) {
				element.classList.add('desc');
			}
		} else if (item.type === 'img') {
			element = new Image();
			element.src = `projects/${id}/${item.src}`;
		} else if (item.type === 'video') {
			element = document.createElement('div');
			element.classList.add('video_container');
			let vid = document.createElement('video');
			vid.src = `projects/${id}/${item.src}`;
			vid.controls = true;
			vid.loop = true;
			element.appendChild(vid);
		} else if (item.type === 'video') {
			element = document.createElement('div');
			element.classList.add('video_container');
			let vid = document.createElement('video');
			vid.src = `projects/${id}/${item.src}`;
			vid.controls = true;
			vid.loop = true;
			element.appendChild(vid);
		} else if (item.type === 'videoauto') {
			element = document.createElement('div');
			element.classList.add('video_container');
			let vid = document.createElement('video');
			vid.src = `projects/${id}/${item.src}`;
			vid.autoplay = true;
			vid.muted = true;
			vid.loop = true;
			element.appendChild(vid);
		}
		containerInner.appendChild(element);
	}
	container.setAttribute('active', 'true');
	modalCloser.setAttribute('active', 'true');
	containerInner.scrollTop = 0;
}

function closeModal() {
	const container = document.querySelector('#project_modal');
	const modalCloser = document.querySelector('#modal_close');
	container.removeAttribute('active');
	modalCloser.removeAttribute('active');
	const allVideos = document.querySelectorAll('#project_modal video');
	for (video of allVideos) {
		video.pause();
	}
}
