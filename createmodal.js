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
		if (['h1', 'h2', 'h3', 'h5', 'h6'].includes(item.type)) {
			element = document.createElement(item.type);
			element.textContent = item.content;
			if (item.color) element.style.color = item.color;
		} else if (item.type === 'p') {
			element = document.createElement('p');
			element.textContent = item.content;
			if (item.desc) {
				element.classList.add('desc');
			}
		} else if (item.type === 'img') {
			element = new Image();
			element.src = `projects/${id}/${item.src}`;
			element.classList.add('main_image');
		} else if (item.type === 'video') {
			element = document.createElement('div');
			element.classList.add('video_container');
			let vid = document.createElement('video');
			vid.setAttribute('preload', 'metadata');
			vid.src = `projects/${id}/${item.src}#t=0.1`;
			if (item.autoplay) {
				vid.muted = true;
				vid.autoplay = true;
			} else vid.controls = true;
			if (item.aspect) {
				vid.style.aspectRatio = item.aspect;
				element.style.aspectRatio = item.aspect;
			}
			vid.loop = true;
			vid.setAttribute('playsinline', true);
			element.appendChild(vid);
		} else if (item.type === 'ul') {
			element = document.createElement('ul');
			element.classList.add('client_list');
			for (let li of item.content) {
				let listEl = document.createElement('li');
				listEl.innerHTML = li;
				element.appendChild(listEl);
			}
		}
		containerInner.appendChild(element);
	}
	document.documentElement.style.overflow = 'hidden';
	container.setAttribute('active', 'true');
	modalCloser.setAttribute('active', 'true');
	containerInner.scrollTop = 0;
}

function closeModal() {
	const container = document.querySelector('#project_modal');
	const modalCloser = document.querySelector('#modal_close');
	container.removeAttribute('active');
	modalCloser.removeAttribute('active');
	document.documentElement.style.overflow = '';
	const allVideos = document.querySelectorAll('#project_modal video');

	for (video of allVideos) {
		video.pause();
	}
}
