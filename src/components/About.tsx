export default function About() {
  return (
    <section id="about" className="relative z-10 border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">About</h2>
        <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
          <p>
            I'm Jon. I spent over ten years in business intelligence at St John Ambulance in London, ending up as
            Commercial Analytics &amp; Information Manager: leading a team of six analysts, moving the organisation
            from QlikView to Power BI and from Access to SQL Server. Before that I was a financial analyst at Accenture
            in Buenos Aires.
          </p>
          <p>
            Now I'm a Digital Architecture Specialist at GOPA Pro, leading the back-office architecture of an EU Youth
            Alumni platform for the European Commission, from the data model and the ETL to the CI/CD pipeline.
          </p>
          <p>
            BI made me start from the problem rather than the technology. The theatre's owner only posts on Instagram,
            so its website reads Instagram. The air in my office felt bad, so I built a sensor to measure it. And I care
            about what happens after launch: monitoring, backups, and whether the people using it are better off.
          </p>
          <p>
            Born in Argentina, I now split my time between London and Kampala, so I'm used to working across time zones.
            If you're hiring for a role where building the system and running it both matter, I'd like to hear from you.
          </p>
        </div>
      </div>
    </section>
  )
}
