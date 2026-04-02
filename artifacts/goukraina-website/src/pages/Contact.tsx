import { useState } from "react";
import PageMeta from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      access_key: "11162fdd-e643-4174-83a9-a036e597dcef",
      subject: "New Contact Form Submission — Go Ukraina",
      from_name: "Go Ukraina Website",
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      subject_field: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        setSubmitted(true);
        form.reset();
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again or email us directly at info@goukraina.com",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20">
      <PageMeta
        title="Contact Us"
        description="Get in touch with Go Ukraina to discuss partnerships, donations, or media inquiries."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact info */}
            <div>
              <h1 className="font-display text-5xl font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Whether you are looking to fund a project, partner with us, or request media
                information, we would love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Headquarters</h3>
                    <p className="text-muted-foreground">
                      Los Angeles, California 90001<br />United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <a
                      href="tel:+13235326855"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (323) 532-6855
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:info@goukraina.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@goukraina.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <CheckCircle2 className="w-16 h-16 text-primary mb-6" />
                  <h3 className="font-display text-2xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 1–2 business days.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">First Name</label>
                        <Input name="first_name" required placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Last Name</label>
                        <Input name="last_name" required placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Email Address</label>
                      <Input name="email" required type="email" placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Subject</label>
                      <Input name="subject" required placeholder="Partnership Inquiry" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Message</label>
                      <Textarea
                        name="message"
                        required
                        placeholder="How can we help?"
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
