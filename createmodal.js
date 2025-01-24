window.addEventListener("DOMContentLoaded", setupModals);

function setupModals() {
	const allProjects = document.querySelectorAll(".project_card[project_id]");
	for (projectLink of allProjects) {
		projectLink.addEventListener("click", createModal, false);
	}
	document.querySelector("#modal_close").addEventListener("click", closeModal, false);
	document.querySelector("#project_modal button.exit_button").addEventListener("click", closeModal, false);
}

function createModal(event) {
	const ct = event.currentTarget;
	const container = document.querySelector("#project_modal");
	const containerInner = container.querySelector("div.content");
	const id = ct.getAttribute("project_id");
	const projectData = data[id];
	const modalCloser = document.querySelector("#modal_close");
	containerInner.innerHTML = "";
	for (item of projectData) {
		let element = "";
		if (!item.type) continue;
		if (item.type === "h1") {
			element = document.createElement("h1");
			element.textContent = item.content;
		} else if (item.type === "h2") {
			element = document.createElement("h2");
			element.textContent = item.content;
		} else if (item.type === "h3") {
			element = document.createElement("h3");
			element.textContent = item.content;
		} else if (item.type === "p") {
			element = document.createElement("p");
			element.textContent = item.content;
			if (item.desc) {
				element.classList.add("desc");
			}
		} else if (item.type === "img") {
			element = new Image();
			element.src = `projects/${id}/${item.src}`;
		} else if (item.type === "video") {
			element = document.createElement("div");
			element.classList.add("video_container");
			let vid = document.createElement("video");
			vid.src = `projects/${id}/${item.src}`;
			vid.controls = true;
			vid.loop = true;
			element.appendChild(vid);
		}
		containerInner.appendChild(element);
	}
	container.setAttribute("active", "true");
	modalCloser.setAttribute("active", "true");
	containerInner.scrollTop = 0;
}

function closeModal() {
	const container = document.querySelector("#project_modal");
	const modalCloser = document.querySelector("#modal_close");
	container.removeAttribute("active");
	modalCloser.removeAttribute("active");
	const allVideos = document.querySelectorAll("#project_modal video");
	for (video of allVideos) {
		video.pause();
	}
}
