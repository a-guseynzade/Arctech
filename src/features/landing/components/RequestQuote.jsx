import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Clock } from "lucide-react";
import { services, contactInfo } from "@/features/landing/data/landing-data";

export default function RequestQuote() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-[var(--dark)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Request A <span className="text-[var(--orange)]">Quote</span>
            </h2>
            <p className="text-white/60 mb-8">
              Fill in the form below and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                />
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white/60 h-12">
                    <SelectValue placeholder="Select Your Service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--dark-lighter)] border-white/10">
                    {services.map((service) => (
                      <SelectItem
                        key={service.value}
                        value={service.value}
                        className="text-white hover:bg-[var(--orange)]/20 focus:bg-[var(--orange)]/20"
                      >
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Additional Details"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
              />
              <Button className="w-full bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-semibold h-12">
                Submit Request
              </Button>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="lg:pl-8">
            <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--orange)]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--orange)]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    {contactInfo.location.title}
                  </h4>
                  {contactInfo.location.lines.map((line, i) => (
                    <p key={i} className="text-white/60 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--orange)]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[var(--orange)]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    {contactInfo.contact.title}
                  </h4>
                  <p className="text-white/60 text-sm">
                    Email: {contactInfo.contact.email}
                  </p>
                  <p className="text-white/60 text-sm">
                    Phone: {contactInfo.contact.phone}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--orange)]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[var(--orange)]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    {contactInfo.hours.title}
                  </h4>
                  {contactInfo.hours.lines.map((line, i) => (
                    <p key={i} className="text-white/60 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 bg-[var(--dark-lighter)] rounded-lg">
              <p className="text-white/80 mb-4">
                Do You Have Any Questions?
                <br />
                <span className="text-[var(--orange)] font-semibold">Contact Us 24 / 7 for help.</span>
              </p>
              <Button
                variant="outline"
                className="border-[var(--orange)] text-[var(--orange)] hover:bg-[var(--orange)] hover:text-white"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
