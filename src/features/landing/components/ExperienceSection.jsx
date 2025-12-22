import { experienceData } from "@/features/landing/data/landing-data";
import workerPortrait from "@/assets/worker-portrait.png";

export default function ExperienceSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--dark)] mb-6">
              <span className="text-[var(--orange)]">{experienceData.years} years</span>
              <br />
              <span className="italic font-light">{experienceData.title}</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              {experienceData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-2xl font-script text-[var(--dark)] italic mb-2">
                {experienceData.founder.signature}
              </p>
              <p className="text-sm text-gray-500">
                {experienceData.founder.name} - {experienceData.founder.title}
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={workerPortrait}
                alt="Experienced construction professional"
                className="w-full h-[500px] object-cover"
              />
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-[var(--orange)] rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
