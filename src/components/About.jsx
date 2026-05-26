export default function About() {
  return (
    <section id="about" className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h3 className="text-2xl font-semibold">About</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          I'm Jon, and I've spent the last few years making a deliberate transition from business intelligence management
          to software engineering, with a recent focus on ML operations and deployment. Born in Argentina, now splitting
          time between London and Kampala due to family commitments, which has given me plenty of practice working across
          time zones and cultures.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          What sets me apart? I approach ML deployment with a BI mindset. I naturally think about data pipelines, model
          monitoring, performance metrics, and how systems behave in production (not just in notebooks). I have first-hand
          experience in digitalisation projects, roadmapping and understanding the business value of technical implementations.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Currently building ML projects that demonstrate end-to-end deployment-from model training to production serving
          with monitoring. Always interested in connecting with ML engineers, MLOps practitioners, or companies
          looking for someone who can bridge technical ML work and production operations.
        </p>
      </div>
    </section>
  )
}