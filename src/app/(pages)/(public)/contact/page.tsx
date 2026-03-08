"use client";
import React, { useState } from "react";
import { AppHeader, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Twitter, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = (await res.json()) as { success: boolean; error?: string };
      if (data.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.error ?? "Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <AppHeader />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="bg-primary/10 text-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
              Support online
            </span>
            <span className="text-muted-foreground text-sm">Join us</span>
          </div>
          <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight lg:text-6xl">
            Let&apos;s Have a Chat 👋
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Questions about our products/services, orders, or just want to say
            hello? We&apos;re here to help
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Jonathan"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Jamie"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              {/* Email and Phone Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Jonathan218@gmail.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Subject"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Hey I have some issues activating my account..."
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  className="min-h-32 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="hover:shadow-primary/20 group relative w-full overflow-hidden rounded-lg py-6 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <div className="border-primary-foreground ml-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <Send size={18} className="ml-2" />
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Button>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href="https://twitter.com/bynainee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://github.com/hasnaintypes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/hasnainx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
