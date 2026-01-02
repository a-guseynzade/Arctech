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

// ============================================
// CONSTANTS
// ============================================

const inputClassNames =
  "bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12";

const CONTACT_BLOCKS = [
  { key: "location", Icon: MapPin },
  { key: "contact", Icon: Phone },
  { key: "hours", Icon: Clock },
];

// ============================================
// SUB-COMPONENTS
// ============================================

function ContactInfoItem({ Icon, data }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-lg bg-[var(--primary-brand)]/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[var(--primary-brand)]" />
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">{data.title}</h4>
        {data.lines.map((line, i) => (
          <p key={i} className="text-white/60 text-sm">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function RequestQuote() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-[var(--dark)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Request A{" "}
              <span className="text-[var(--primary-brand)]">Quote</span>
            </h2>
            <p className="text-white/60 mb-8">
              Fill in the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Name" className={inputClassNames} />
                <Input
                  type="email"
                  placeholder="Email"
                  className={inputClassNames}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone"
                  className={inputClassNames}
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
                        className="text-white hover:bg-[var(--primary-brand)]/20 focus:bg-[var(--primary-brand)]/20"
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
              <Button className="w-full bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-dark)] text-white font-semibold h-12">
                Submit Request
              </Button>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="lg:pl-8">
            <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>

            <div className="space-y-6">
              {CONTACT_BLOCKS.map(({ key, Icon }) => (
                <ContactInfoItem
                  key={key}
                  Icon={Icon}
                  data={contactInfo[key]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
