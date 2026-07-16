"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

const initialFormData = {
  fullName: "",
  hospitalName: "",
  email: "",
  phone: "",
  product: "",
  details: "",
  website: "",
};

export default function ContactForm({
  requestedProduct = "",
}) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    product: requestedProduct,
  });

  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    const payload = {
      fullName: formData.fullName.trim(),
      hospitalName: formData.hospitalName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      product: formData.product.trim(),
      details: formData.details.trim(),

      // Hidden honeypot field for basic bot protection.
      website: formData.website,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseData = null;

      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }

      if (!response.ok) {
        throw new Error(
          responseData?.message ||
            "Unable to send your enquiry.",
        );
      }

      setStatus("success");
      setStatusMessage(
        "Thank you. Your enquiry has been submitted successfully.",
      );

      setFormData({
        ...initialFormData,
        product: requestedProduct,
      });
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry. Please try again.",
      );
    }
  }

  function resetForm() {
    setFormData({
      ...initialFormData,
      product: requestedProduct,
    });

    setStatus("idle");
    setStatusMessage("");
  }

  if (status === "success") {
    return (
      <section
        aria-labelledby="contact-success-heading"
        className="flex min-h-[560px] flex-col items-center justify-center rounded-[40px] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-100"
      >
        <div className="mb-6 rounded-full bg-[#2ecc71]/10 p-5">
          <CheckCircle2
            size={60}
            aria-hidden="true"
            className="text-[#2ecc71]"
          />
        </div>

        <h2
          id="contact-success-heading"
          className="mb-3 text-3xl font-extrabold text-[#005a8d]"
        >
          Enquiry submitted
        </h2>

        <p
          role="status"
          className="max-w-md leading-relaxed text-slate-600"
        >
          {statusMessage}
        </p>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
          Our team will review your message and contact you using the
          details provided.
        </p>

        <button
          type="button"
          onClick={resetForm}
          className="mt-8 rounded-2xl border-2 border-[#005a8d] px-7 py-3.5 font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white"
        >
          Send another enquiry
        </button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="rounded-[40px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-100 sm:p-10"
    >
      <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#2ecc71]">
        Enquiry Form
      </p>

      <h2
        id="contact-form-heading"
        className="mb-3 text-3xl font-extrabold text-[#005a8d]"
      >
        Send us a message
      </h2>

      <p className="mb-8 text-sm leading-7 text-slate-500">
        Fields marked with an asterisk are required.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
      >
        {/* Honeypot field */}

        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor="website">Website</label>

          <input
            id="website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Full Name"
            htmlFor="fullName"
            required
          >
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your full name"
              className="form-input"
            />
          </FormField>

          <FormField
            label="Hospital, Clinic or Company"
            htmlFor="hospitalName"
          >
            <input
              id="hospitalName"
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              maxLength={150}
              autoComplete="organization"
              placeholder="Organisation name"
              className="form-input"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Email Address"
            htmlFor="email"
            required
          >
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={150}
              autoComplete="email"
              inputMode="email"
              placeholder="name@example.com"
              className="form-input"
            />
          </FormField>

          <FormField
            label="Phone Number"
            htmlFor="phone"
          >
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={20}
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98765 43210"
              className="form-input"
            />
          </FormField>
        </div>

        <FormField
          label="Product of Interest"
          htmlFor="product"
        >
          <input
            id="product"
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            maxLength={120}
            placeholder="Enter product name"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Enquiry Details"
          htmlFor="details"
          required
        >
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={2000}
            rows={6}
            placeholder="Please describe your product, supply or partnership enquiry."
            className="form-input resize-y"
          />

          <p className="mt-2 text-right text-xs text-slate-400">
            {formData.details.length}/2000
          </p>
        </FormField>

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle
              size={20}
              aria-hidden="true"
              className="mt-0.5 flex-shrink-0"
            />

            <p>{statusMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#005a8d] px-6 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-[#004066] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ecc71] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle
                size={20}
                aria-hidden="true"
                className="animate-spin"
              />
              Sending enquiry...
            </>
          ) : (
            <>
              <Send size={19} aria-hidden="true" />
              Submit Enquiry
            </>
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-slate-400">
          Please do not submit confidential patient information or
          medical records through this form.
        </p>
      </form>

      <style jsx>{`
        .form-input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid rgb(226 232 240);
          background: rgb(248 250 252);
          padding: 0.875rem 1rem;
          color: rgb(51 65 85);
          outline: none;
          transition:
            border-color 150ms ease,
            box-shadow 150ms ease,
            background-color 150ms ease;
        }

        .form-input:focus {
          border-color: #2ecc71;
          background: white;
          box-shadow: 0 0 0 3px rgb(46 204 113 / 12%);
        }

        .form-input::placeholder {
          color: rgb(148 163 184);
        }
      `}</style>
    </section>
  );
}

function FormField({
  label,
  htmlFor,
  required = false,
  children,
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={htmlFor}
        className="mb-2 text-sm font-semibold text-slate-700"
      >
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-red-500"
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}