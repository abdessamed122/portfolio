"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
	name: string;
	description: string;
	html_url: string;
}

function RepoImage({ projectName, previewImageUrl }: { projectName: string; previewImageUrl: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(previewImageUrl);
  const [checkedReadme, setCheckedReadme] = useState(false);

  useEffect(() => {
    if (!imgSrc && !checkedReadme) {
      // Try to fetch README and extract first image
      fetch(`https://raw.githubusercontent.com/abdessamed122/${projectName}/main/README.md`)
        .then(res => res.ok ? res.text() : "")
        .then(text => {
          const match = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
          if (match && match[1]) {
            let url = match[1];
            if (!url.startsWith("http")) {
              url = `https://raw.githubusercontent.com/abdessamed122/${projectName}/main/${url.replace(/^\.\//, "")}`;
            }
            setImgSrc(url);
          }
        });
      setCheckedReadme(true);
    }
  }, [imgSrc, checkedReadme, projectName]);

  if (!imgSrc) return null;
  return (
    <img
      src={imgSrc}
      alt={projectName + ' preview'}
      className="w-full h-56 object-contain bg-gray-100 rounded mb-4 border"
      style={{ maxHeight: '220px', minHeight: '120px', objectFit: 'contain', background: '#f3f4f6' }}
      onError={() => setImgSrc(null)}
    />
  );
}

export default function Home() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://api.github.com/users/abdessamed122/repos?per_page=100")
			.then((res) => res.json())
			.then((data: Project[]) => {
				setProjects(
					data
						.filter((repo) => repo.description && repo.description.trim() !== "")
						.map((repo) => ({
							name: repo.name,
							description: repo.description,
							html_url: repo.html_url,
						}))
				);
				setLoading(false);
			});
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-400 via-pink-200 to-purple-500 dark:from-blue-900 dark:via-purple-900 dark:to-gray-900 p-4 sm:p-8 transition-colors duration-300">
			<header className="max-w-3xl mx-auto text-center mb-12">
				<Image
					src="/d55a711c-47d6-4a2f-a9d1-5e3e50587dee.jpg"
					alt="Abdessamed Ouahabi professional photo"
					width={160}
					height={160}
					className="mx-auto rounded-full border-4 border-blue-400 dark:border-blue-600 shadow-xl mb-4 object-cover hover:scale-105 transition-transform duration-300"
					priority
				/>
				<h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
					ABDEESSAMED OUAHABI
				</h1>
				<p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
					Aspiring Software Engineer with a Bachelor of Science in Computer Systems (BSCS). Passionate about building modern web applications, artificial intelligence, and data analysis. Experienced in React, Next.js, TypeScript, Python and open-source collaboration. Always eager to solve real-world problems and learn new technologies.
				</p>
				<div className="flex flex-wrap justify-center gap-4 mb-4">
					<a
						href="/cv.pdf"
						download
						className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow hover:from-green-500 hover:to-blue-600 focus:ring-2 focus:ring-green-300 transition font-semibold text-base"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
						Download CV
					</a>
					<a
						href="/thesis.pdf"
						download
						target="_blank"
						className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full shadow hover:from-purple-500 hover:to-pink-600 focus:ring-2 focus:ring-purple-300 transition font-semibold text-base"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
						View Graduation Thesis
					</a>
				</div>
				<div className="flex flex-wrap justify-center gap-4">
					<a
						href="https://www.linkedin.com/in/abdessamed-ouahabi/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.5 8.25V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v10.5A2.25 2.25 0 009.75 19.5h4.5a2.25 2.25 0 002.25-2.25v-1.5"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 12h7.5"
							/>
						</svg>
						LinkedIn
					</a>
					<a
						href="mailto:ouahabi.abdessamed@univ-bechar.dz"
						className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.75 6.75l-9.75 7.5-9.75-7.5"
							/>
						</svg>
						Email
					</a>
					<a
						href="https://github.com/abdessamed122"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 transition"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
							className="w-5 h-5"
						>
							<path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
						</svg>
						GitHub
					</a>
				</div>
			</header>

			<main className="flex flex-col items-center justify-center w-full">
				<section className="max-w-5xl w-full mx-auto mb-16">
					<h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300 tracking-tight">Projects</h2>
					{loading ? (
						<p className="text-lg text-gray-500 dark:text-gray-400 animate-pulse">Loading projects...</p>
					) : (
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{projects.map((project) => {
  // Try to get preview.png from repo, else try to get first image from README
  const previewImageUrl = `https://raw.githubusercontent.com/abdessamed122/${project.name}/main/preview.png`;
  return (
	<div
	  key={project.name}
	  className="bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 dark:from-blue-950 dark:via-purple-950 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-blue-300 dark:border-blue-800 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 flex flex-col"
	>
	  <RepoImage projectName={project.name} previewImageUrl={previewImageUrl} />
	  <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">{project.name}</h3>
	  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
		{project.description}
	  </p>
	  <a
		href={project.html_url}
		target="_blank"
		rel="noopener noreferrer"
		className="inline-block mt-auto text-blue-600 dark:text-blue-400 font-medium hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition"
	  >
		View on GitHub
	  </a>
	</div>
  );
})}
						</div>
					)}
				</section>

				<section className="max-w-5xl w-full mx-auto mb-16">
					<h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300 tracking-tight">Skills</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Programming */}
						<div>
							<h3 className="flex items-center gap-2 text-lg font-semibold mb-4"><span role="img" aria-label="Developer">👨‍💻</span> Programming</h3>
							<div className="flex flex-wrap gap-3">
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full font-medium shadow">Python</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full font-medium shadow">JavaScript</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full font-medium shadow">TypeScript</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full font-medium shadow">SQL</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full font-medium shadow">Bash</span>
							</div>
						</div>
						{/* Frameworks & Tools */}
						<div>
							<h3 className="flex items-center gap-2 text-lg font-semibold mb-4"><span role="img" aria-label="Tools">⚙️</span> Frameworks & Tools</h3>
							<div className="flex flex-wrap gap-3">
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">React</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">Next.js</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">Node.js</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">Express</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">TensorFlow</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">LangChain</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium shadow">Git</span>
							</div>
						</div>
						{/* Data & AI */}
						<div>
							<h3 className="flex items-center gap-2 text-lg font-semibold mb-4"><span role="img" aria-label="Data">📊</span> Data & AI</h3>
							<div className="flex flex-wrap gap-3">
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium shadow">Machine Learning</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium shadow">RAG</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium shadow">NLP</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium shadow">Data Analysis</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium shadow">Pandas</span>
								<span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium shadow">NumPy</span>
							</div>
						</div>
					</div>
				</section>

				{/* Certificates Section */}
				<section className="max-w-5xl w-full mx-auto mb-16 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 dark:from-purple-950 dark:via-blue-950 dark:to-gray-900 rounded-2xl shadow-xl p-8">
					<h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300 tracking-tight">Certificates</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
							<Image src="/cert-chatgpt-prompt.png" alt="ChatGPT Prompt Engineering for Developers" width={180} height={130} className="rounded-lg object-cover shadow mb-2 border-2 border-purple-300 dark:border-purple-700" />
							<p className="font-medium text-gray-800 dark:text-gray-100 mb-1 text-center">ChatGPT Prompt Engineering for Developers</p>
							<a href="https://learn.deeplearning.ai/accomplishments/6b858bce-83a7-427c-8c20-79b33a46adbb?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-purple-700 dark:text-purple-300 underline text-sm hover:text-purple-900 dark:hover:text-purple-100 transition">View Certificate</a>
						</div>
						<div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
							<Image src="/cert-langchain-chat.png" alt="LangChain Chat with Your Data" width={180} height={130} className="rounded-lg object-cover shadow mb-2 border-2 border-purple-300 dark:border-purple-700" />
							<p className="font-medium text-gray-800 dark:text-gray-100 mb-1 text-center">LangChain Chat with Your Data</p>
							<a href="https://learn.deeplearning.ai/accomplishments/86a2f3fa-af4f-4701-b101-61d192d125bb?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-purple-700 dark:text-purple-300 underline text-sm hover:text-purple-900 dark:hover:text-purple-100 transition">View Certificate</a>
						</div>
						<div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
							<Image src="/cert-langchain-llm.png" alt="LangChain for LLM Application Development" width={180} height={130} className="rounded-lg object-cover shadow mb-2 border-2 border-purple-300 dark:border-purple-700" />
							<p className="font-medium text-gray-800 dark:text-gray-100 mb-1 text-center">LangChain for LLM Application Development</p>
							<a href="https://learn.deeplearning.ai/accomplishments/e4a708a0-f4e8-47e3-a121-5affe069975e?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-purple-700 dark:text-purple-300 underline text-sm hover:text-purple-900 dark:hover:text-purple-100 transition">View Certificate</a>
						</div>
						<div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
							<Image src="/cert-multimodal-rag.png" alt="Multimodal RAG: Chat with Videos" width={180} height={130} className="rounded-lg object-cover shadow mb-2 border-2 border-purple-300 dark:border-purple-700" />
							<p className="font-medium text-gray-800 dark:text-gray-100 mb-1 text-center">Multimodal RAG: Chat with Videos</p>
							<a href="https://learn.deeplearning.ai/accomplishments/11ca6151-7558-4697-b5f7-3f5503723540?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-purple-700 dark:text-purple-300 underline text-sm hover:text-purple-900 dark:hover:text-purple-100 transition">View Certificate</a>
						</div>
					</div>
				</section>

				{/* Blog Section */}
				<section className="max-w-5xl w-full mx-auto mb-16 bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 dark:from-green-950 dark:via-blue-950 dark:to-purple-950 rounded-2xl shadow-xl p-8">
					<h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300 tracking-tight">Blog</h2>
					<p className="text-gray-700 dark:text-gray-200 mb-6 text-lg">Latest articles, tutorials, and thoughts on programming, AI, and technology.</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Example blog posts - replace with dynamic content or API later */}
						<article className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform duration-300">
							<h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">How Can AI Understand Conversations in Dialects?</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">One of the biggest challenges in Natural Language Processing (NLP) is dealing with dialects and informal speech. Unlike standard language, dialects vary in structure, vocabulary, and even pronunciation across different regions.

Recently, I had an interesting experience with ChatGPT — I tested its ability to understand casual conversations in "Darija" (a North African Arabic dialect), and the results were impressive!</p>
							<a href="https://medium.com/@ouahabi.abdessamed/how-can-ai-understand-conversations-in-dialects-eae41cdccfe5" className="text-green-700 dark:text-green-300 underline text-sm hover:text-green-900 dark:hover:text-green-100 transition">Read More</a>
						</article>
						<article className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform duration-300">
							<h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Overcoming GPU Memory Challenges in Training Large Language Models (LLMs) 🚀</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">One of the biggest challenges in training LLMs is running out of GPU memory. With models exceeding billions of parameters, memory efficiency becomes critical.</p>
							<a href="https://www.linkedin.com/feed/update/urn:li:activity:7298717404791033856?utm_source=share&utm_medium=member_desktop&rcm=ACoAADha9dYBzz2tcAj9GxRbMlDJtHV4iaWuHAc" className="text-green-700 dark:text-green-300 underline text-sm hover:text-green-900 dark:hover:text-green-100 transition">Read More</a>
						</article>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="max-w-5xl w-full mx-auto mb-16 bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 dark:from-blue-950 dark:via-purple-950 dark:to-gray-900 rounded-2xl shadow-xl p-8">
					<h2 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-200 tracking-tight">Testimonials</h2>
					{/* <p className="text-gray-700 dark:text-gray-200 mb-6 text-lg">What people are saying on LinkedIn:</p> */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<blockquote className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl shadow-lg p-6 flex flex-col">
  <p className="text-gray-800 dark:text-gray-100 italic mb-4">
    “I was impressed by the motivation, curiosity, and skills demonstrated by the students from Tahri Mohamed University in Béchar, especially during our discussions at the EDiS 2024 conference. Their potential in the field of data science and AI is remarkable.”
  </p>
  <div className="flex items-center gap-3 mt-auto">
    <div>
      <p className="font-semibold text-blue-700 dark:text-blue-300">Prof. Fulvio Risso</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">Politecnico di Torino</p>
    </div>
  </div>
</blockquote>
						<blockquote className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl shadow-lg p-6 flex flex-col">
							<p className="text-gray-800 dark:text-gray-100 italic mb-4">“Working with Abdessamed was a pleasure. He brings creativity and dedication to every project.”</p>
							<div className="flex items-center gap-3 mt-auto">
								<Image src="/ahmed1.jpg" alt="https://www.linkedin.com/in/gasba-ahmed-783a932b9" width={40} height={40} className="rounded-full border-2 border-blue-300" />
								<div>
									<p className="font-semibold text-blue-700 dark:text-blue-300">Gasba Ahmed</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">Colleague</p>
								</div>
							</div>
						</blockquote>
					</div>
				</section>

				{/* Achievements Gallery Section - Carousel */}
				<section className="max-w-5xl w-full mx-auto mb-16 bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 dark:from-blue-950 dark:via-purple-950 dark:to-gray-900 rounded-2xl shadow-xl p-8">
					<h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 tracking-tight">Achievements Gallery</h2>
					<AchievementsCarousel />
				</section>

				{/* FAQ Section */}
<section className="max-w-5xl w-full mx-auto mb-16 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-yellow-900 dark:via-pink-900 dark:to-blue-900 rounded-2xl shadow-xl p-8">
  <h2 className="text-3xl font-bold mb-6 text-yellow-700 dark:text-yellow-300 tracking-tight">FAQ</h2>
  <div className="space-y-6">
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow flex flex-col">
      <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-200 mb-2">What technologies do you use most?</h3>
      <p className="text-gray-700 dark:text-gray-200">I mainly use React, Next.js, TypeScript, Python, and various AI/ML frameworks such as TensorFlow and LangChain.</p>
    </div>
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow flex flex-col">
      <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-200 mb-2">Are you open to freelance or remote work?</h3>
      <p className="text-gray-700 dark:text-gray-200">Yes, I am open to freelance and remote opportunities. Please contact me via LinkedIn or email for collaboration.</p>
    </div>
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow flex flex-col">
      <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-200 mb-2">How can I see your certificates?</h3>
      <p className="text-gray-700 dark:text-gray-200">You can view my certificates in the Certificates section above, each with a direct link to the official credential.</p>
    </div>
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow flex flex-col">
      <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-200 mb-2">How can I download your CV?</h3>
      <p className="text-gray-700 dark:text-gray-200">Just click the “Download CV” button at the top of the page to get a PDF copy of my resume.</p>
    </div>
  </div>
</section>
			</main>
		</div>
	);
}

// Carousel component at the bottom of the file
function AchievementsCarousel() {
  const images = [
    {
      src: "/me-dr-flivo-riso.jpg",
      alt: "Meeting with Dr. Flivo Riso at EDiS 2024",
      caption: "Meeting with Dr. Flivo Riso at EDiS 2024",
      description: "This photo captures my inspiring and memorable meeting with Dr. Flivo Riso during the EDiS 2024 event. It was a truly great and motivating encounter in my academic and professional journey."
    },
    {
      src: "/me-gasba-ahmed-dr-khair.jpg",
      alt: "With Gasba Ahmed and Dr. Khair Younes",
      caption: "With Gasba Ahmed and Dr. Khair Younes",
      description: "A memorable moment with my colleague Gasba Ahmed and supervisor Dr. Khair Younes during our final project presentation."
    },
    {
      src: "/edis2024-univ-bechar.jpg",
      alt: "EDiS 2024 at University of Bechar",
      caption: "EDiS 2024 at University of Bechar",
      description: "Participation in EDiS 2024 at University of Bechar, showcasing innovative solutions and networking with industry leaders."
    }
  ];
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full flex justify-center items-center">
        <button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition mr-4">
          <svg className="w-6 h-6 text-blue-700 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col items-center">
          <Image src={images[current].src} alt={images[current].alt} width={600} height={400} className="rounded-2xl object-cover shadow-lg border-4 border-blue-300 dark:border-blue-700 max-w-full" />
          <h4 className="text-xl font-bold mt-4 text-blue-800 dark:text-blue-200">{images[current].caption}</h4>
          <p className="text-center mt-2 text-base font-medium text-gray-700 dark:text-gray-200 max-w-2xl">{images[current].description}</p>
        </div>
        <button onClick={next} aria-label="Next" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition ml-4">
          <svg className="w-6 h-6 text-blue-700 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-600 dark:bg-blue-300' : 'bg-blue-200 dark:bg-blue-700'} transition`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
