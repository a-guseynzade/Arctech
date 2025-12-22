import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/features/landing/data/landing-data";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-[var(--orange)]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Quote className="w-12 h-12 text-[var(--dark)]/20 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--dark)]">
            What Our <span className="italic font-light">Client Says</span>
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--dark)]/80 text-lg lg:text-xl leading-relaxed mb-8">
            "{currentTestimonial.text}"
          </p>

          {/* Author */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.author}
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--dark)]/20"
            />
            <div className="text-left">
              <p className="font-semibold text-[var(--dark)]">{currentTestimonial.author}</p>
              <p className="text-[var(--dark)]/60 text-sm">{currentTestimonial.position}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-[var(--dark)]/10 hover:bg-[var(--dark)]/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--dark)]" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[var(--dark)]" : "bg-[var(--dark)]/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[var(--dark)]/10 hover:bg-[var(--dark)]/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[var(--dark)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
