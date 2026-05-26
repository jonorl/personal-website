import { motion } from "framer-motion";

export default function Avatar() {

  const MotionDiv = motion.div;
  const AVATAR = "https://res.cloudinary.com/dqqdfeuo1/image/upload/v1755504750/P_20240508_152743_kjd1p0.jpg"

  return (

    <MotionDiv
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <div className="group relative mx-auto max-w-sm overflow-hidden border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="inset-0 bg-gradient-to-br from-zinc-500/10 via-transparent to-sky-500/10" />
        <div className="relative">
          <div className="mx-auto m-0 h-auto w-28 rounded-full bg-gradient-to-tr from-zinc-500 to-sky-500 p-1">
            <img
              src={AVATAR}
              alt="Jonathan Orlowski"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <h4 className="mt-4 text-center text-lg font-semibold">Jonathan Orlowski</h4>
          <p className="mt-1 text-center text-sm text-slate-500">MLOps-Oriented Software Engineer</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {[
              "PyTorch & TensorFlow",
              "React & Node",
              "PostgreSQL",
              "Docker",
              "PowerAutomate & n8n",
              "PowerBI",
            ].map((tag) => (
              <li key={tag} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionDiv>

  )
}