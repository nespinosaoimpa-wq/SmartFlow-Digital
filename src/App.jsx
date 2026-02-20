import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_DATA, CRAFT_DATA, PROJECTS_DATA } from './data/mockData'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Cinematic Reveal
      const revealTl = gsap.timeline({ delay: 0.5 })
      revealTl.fromTo(".reveal-item",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          force3D: true
        }
      )

      // 2. Scroll Triggered Transitions
      gsap.utils.toArray("section").forEach((section, i) => {
        if (i === 0) return // Skip hero
        gsap.fromTo(section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // 3. Floating Animation for Hero Visual
      gsap.to(".hero-visual", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        rotation: "random(-2, 2)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectedProject])

  return (
    <div ref={containerRef} className="bg-[#0a0a0c] text-slate-100 selection:bg-primary-blue/30 overflow-x-hidden">

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-blue/20 rounded-full blur-lg group-hover:bg-primary-blue/40 transition-all"></div>
              <span className="material-symbols-outlined text-2xl font-light text-white relative">all_inclusive</span>
            </div>
            <span className="text-xl font-wide tracking-tighter uppercase font-extrabold italic">Smart<span className="text-primary-blue">Flow</span></span>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            {[["Proyectos", "work"], ["Estudio", "studio"], ["Servicios", "services"], ["Contacto", "contacto"]].map(([label, link]) => (
              <a key={label} className="text-[10px] letter-spacing-widest font-bold uppercase hover:text-primary-blue transition-colors tracking-[0.3em]" href={`#${link}`}>
                {label}
              </a>
            ))}
          </nav>
          <button className="px-8 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-primary-blue hover:text-white transition-all rounded-full">
            Consulta
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050507] via-[#0a0a15] to-[#050507]"></div>
          <div className="absolute inset-0 grid-bg-mesh opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-primary-blue/5 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 hero-visual scale-125">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c] z-20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0c_80%)] z-20"></div>
            <img
              alt="Fondo cinemático"
              className="w-full h-full object-cover mix-blend-lighten opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdgJh8RK_Pdw9ILmL07DYsuM4EqU79Pwx4xflI681unI0qRCJKXh5NruG2o5EArdhWnuy_xVQBi5-tefmGNBfWl3CqfZ7EFWRa16VHgd_UACTOTLLx7Nh47EaEeGhcjpFnExaZK3TL0nqbeW1EWxg4ohfCJxTazW_Zz2k3bfmo6RpMQ5HdvMCWwSB9XfUc_Puk--r4N4wGvga70RpCetpxUvBBm_0xQJOnzJZzK9dPjp_2chSuMPYHWMVnfXYmpN6bBhajI___yUs"
            />
          </div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-6xl">
          <div className="mb-12 reveal-item">
            <span className="font-wide text-[10px] uppercase tracking-[0.8em] text-primary-blue mb-6 block font-black opacity-80">Diseño & Desarrollo Web Premium</span>
            <div className="h-px w-20 bg-primary-blue/30 mx-auto"></div>
          </div>

          <h1 className="reveal-item font-display font-black text-6xl md:text-9xl lg:text-[10rem] leading-[0.9] tracking-tighter uppercase">
            SMART<span className="text-primary-blue font-serif-fluid italic normal-case tracking-normal">Flow</span> STUDIO
          </h1>

          <div className="mt-12 max-w-2xl mx-auto reveal-item">
            <p className="font-wide text-xs md:text-sm text-slate-400 uppercase tracking-[0.3em] leading-relaxed">
              Desarrollo Web de Alto Rendimiento <br />
              <span className="text-white/40">y Diseño Estratégico para Líderes Globales.</span>
            </p>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 reveal-item">
            <button className="group relative px-16 py-6 overflow-hidden bg-primary-blue text-white rounded-full transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(19,91,236,0.3)]">
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">Start Project</span>
            </button>
            <a className="group flex items-center gap-4 py-2" href="#work">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">Portafolio</span>
              <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-primary-blue transition-all duration-500"></div>
            </a>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="relative py-32 border-t border-white/5 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col items-start gap-4 mb-24 transition-all">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary-blue"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold">Estudio de Expertos</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] max-w-4xl font-display">
              Artesanía Digital <br /><span className="text-white/30 italic">Refinada.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {CRAFT_DATA.map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="glass-panel rounded-[2rem] p-12 h-full flex flex-col transition-all duration-700 hover:translate-y-[-8px]">
                  <div className="relative w-full aspect-video mb-12 flex items-center justify-center overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-primary-blue/5 rounded-full blur-[80px]"></div>
                    <img alt={item.title} className="w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" src={item.imgUrl} />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">{item.subtitle}</h3>
                    <h2 className="text-4xl font-medium tracking-tight mb-6">{item.title}</h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-md font-light">
                      {item.title === "UI/UX Estratégico"
                        ? "Sintetizamos la arquitectura de marca con experiencias sensoriales. Nuestro enfoque se basa en el minimalismo suizo y estética funcional de alta gama."
                        : "Precisión técnica combinada con rendimiento sin compromisos. Construimos infraestructuras digitales escalables usando frameworks modernos."}
                    </p>
                    <div className="pt-8 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4">
                      {item.features.slice(0, 3).map(f => (
                        <span key={f} className="text-[9px] uppercase tracking-widest font-semibold text-white/30">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SHOWCASE SECTION --- */}
      <section id="work" className="relative min-h-screen pt-32 pb-48 grid-bg-dots overflow-hidden">
        <header className="max-w-7xl mx-auto px-8 mb-24 relative z-10">
          <span className="text-primary-blue font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Portfolio de Trabajos</span>
          <h2 className="text-6xl md:text-9xl font-bold leading-none tracking-tighter font-display">
            EL <span className="text-transparent" style={{ webkitTextStroke: '1px white' }}>SHOWCASE</span>
          </h2>
        </header>

        <div className="max-w-7xl mx-auto px-8 space-y-64">
          {PROJECTS_DATA.map((project, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-20 group`}>
              <div className="relative w-full md:w-[60%] order-2 md:order-1 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="absolute -inset-10 bg-primary-blue/20 blur-[100px] rounded-full group-hover:bg-primary-blue/30 transition-all opacity-0 group-hover:opacity-100 duration-1000"></div>
                <div className={`relative transition-all duration-1000 transform ${idx % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'} group-hover:rotate-0 group-hover:scale-[1.02]`}>
                  <div className="bg-neutral-900 p-2 rounded-t-[2rem] border-x-4 border-t-4 border-neutral-800 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary-blue/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                      <span className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Vista Previa</span>
                    </div>
                    <img alt={project.title} className="w-full aspect-video object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-2000" src={project.imgUrl} />
                  </div>
                  <div className="h-4 bg-neutral-950 rounded-b-xl border-x-4 border-b-4 border-neutral-900 shadow-xl"></div>
                </div>
              </div>

              <div className="flex items-start gap-12 order-1 md:order-2">
                <h3 className="vertical-text text-6xl md:text-9xl font-bold uppercase tracking-tighter text-neutral-800 group-hover:text-primary-blue transition-colors duration-700 font-display whitespace-nowrap">
                  {project.title}
                </h3>
                <div className="max-w-xs pt-4">
                  <span className="text-primary-blue text-[10px] font-bold uppercase tracking-[0.4em] block mb-6">{project.category}</span>
                  <p className="text-slate-400 text-lg leading-relaxed font-light italic">{project.description}</p>
                  <div className="flex gap-6 mt-10">
                    <button className="flex items-center gap-4 group/btn" onClick={() => setSelectedProject(project)}>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Previsualizar</span>
                      <div className="w-8 h-[1px] bg-primary-blue group-hover/btn:w-16 transition-all duration-500"></div>
                    </button>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-48 flex items-center justify-center overflow-hidden bg-[#0a0a0c] border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 grid-bg-mesh opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="text-primary-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-8 block opacity-60">Disponible para nuevos desafíos</span>
          <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-16 font-display uppercase">
            ¿LISTO PARA <span className="text-primary-blue italic font-serif-fluid normal-case tracking-normal">Elevar</span> TU PRESENCIA?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <button className="bg-primary-blue text-white hover:scale-105 px-16 py-7 rounded-full font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_rgba(19,91,236,0.3)] flex items-center gap-6 group">
              INICIAR PROYECTO
              <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-all">arrow_right_alt</span>
            </button>
            <p className="text-slate-500 font-medium text-left max-w-[200px] leading-relaxed text-[9px] uppercase tracking-widest italic opacity-60">
              Arquitectando experiencias de alta fidelidad para marcas de clase mundial.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0a0a0c] border-t border-white/5 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="material-symbols-outlined text-3xl text-primary-blue">all_inclusive</span>
              <span className="text-2xl font-wide uppercase font-black italic tracking-tighter">SmartFlow</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-12 leading-loose text-sm font-light">
              Un estudio creativo independiente enfocado en la intersección del diseño, la tecnología y la experiencia humana.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-10 uppercase text-[10px] tracking-[0.4em] text-slate-500">Navegación</h4>
            <ul className="space-y-6 text-sm">
              {["Nuestro Trabajo", "Servicios", "El Proceso", "Estudio"].map(link => (
                <li key={link}><a className="hover:text-primary-blue transition-colors text-slate-400 uppercase tracking-widest font-black text-[10px]" href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-10 uppercase text-[10px] tracking-[0.4em] text-slate-500">Flujo Digital</h4>
            <div className="flex flex-col gap-4">
              <div className="ticker-track flex gap-12 whitespace-nowrap opacity-20">
                {['DISEÑO', 'CÓDIGO', 'FLUJO', 'DISEÑO', 'CÓDIGO', 'FLUJO'].map((word, i) => (
                  <span key={i} className="text-2xl font-black italic tracking-tighter">{word}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>© 2024 SmartFlow Creative Studio. Todos los derechos reservados.</p>
          <div className="flex gap-12">
            <a className="hover:text-white transition-colors" href="#">Privacidad</a>
            <a className="hover:text-white transition-colors" href="#">Términos</a>
          </div>
        </div>
      </footer>

      {/* --- PREVIEW MODAL --- */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-20 bg-black/95 backdrop-blur-2xl"
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-primary-blue transition-colors z-[10000] p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(null);
            }}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          <div
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-neutral-900 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-12 bg-neutral-800 border-b border-white/5 flex items-center px-8 gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="bg-black/20 px-4 py-1.5 rounded-md text-[9px] text-white/40 font-mono tracking-widest lowercase">
                smartflow.studio/preview/{selectedProject.title.toLowerCase().replace(' ', '-')}
              </div>
            </div>

            <div className="flex-1 relative overflow-auto bg-[#0a0a0c]">
              <div className="absolute inset-0 grid-bg-mesh opacity-20 pointer-events-none"></div>
              {/* Simulated UI Preview */}
              <div className="p-12 md:p-24 space-y-12">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-primary-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Vista Previa de Proyecto</span>
                    <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tight">{selectedProject.title}</h2>
                  </div>
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary-blue hover:text-white transition-all">
                    Ver Proyecto en Vercel
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <p className="text-xl text-slate-400 font-light italic leading-relaxed">{selectedProject.description}</p>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Tecnologías Utilizadas</h4>
                      <div className="flex flex-wrap gap-3">
                        {["React", "GSAP", "Tailwind", "Vite", "Supabase"].map(tag => (
                          <span key={tag} className="px-4 py-2 border border-white/10 rounded-lg text-[9px] uppercase tracking-widest text-white/60">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    <img alt={selectedProject.title} className="w-full h-full object-cover" src={selectedProject.imgUrl} />
                  </div>
                </div>

                {/* Visual Placeholder for deeper features */}
                <div className="grid grid-cols-3 gap-6 opacity-40">
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/5"></div>
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/5"></div>
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
