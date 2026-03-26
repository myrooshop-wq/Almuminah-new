import React from 'react';
import { motion } from 'motion/react';

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block">About Us</span>
        <h1 className="text-5xl md:text-6xl font-serif text-brand-green mb-12 leading-tight">
          Pioneering <span className="italic">Islamic Excellence</span> Since Inception
        </h1>
        
        <div className="prose prose-lg prose-brand-green max-w-none space-y-8 text-brand-green/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-brand-green">Our Ideology</h2>
            <p>
              AL-MU’MINAH GROUP OF SCHOOLS is an Islamic School; born out of the ideology that only worldly academic education is not sufficient for the ultimate success of a believer. In today’s world, where moral values are rapidly declining, it is imperative to provide an environment that nurtures both the mind and the soul.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-brand-green/10 my-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-brand-green">Our Vision</h3>
              <p className="text-sm">
                To be a premier educational institution that produces confident, knowledgeable, and spiritually grounded Muslimahs who contribute positively to society while upholding the values of Islam.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-brand-green">Our Mission</h3>
              <p className="text-sm">
                To provide a holistic education that integrates high-quality academic learning with deep Islamic knowledge, specifically focusing on the understanding of the Qur’an through word-for-word translation.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-brand-green">Our Aim</h2>
            <p>
              Our primary aim is to produce students who are not only academically brilliant but also spiritually conscious. We strive to create an environment where girls can excel in their studies without compromising their Islamic identity or values.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Excellence in Academic and Islamic Education.</li>
              <li>Mastery of Quranic Arabic and word-for-word translation.</li>
              <li>Development of strong character and moral values.</li>
              <li>Preparation for the SSC board examinations with top honors.</li>
            </ul>
          </section>

          <div className="bg-brand-green text-brand-cream p-10 rounded-2xl mt-16">
            <h3 className="text-2xl font-serif mb-4 italic text-brand-gold">A Message from the Founder</h3>
            <p className="font-light italic leading-relaxed">
              "We believe that every girl has the potential to be a beacon of light for her family and community. Our role is to provide the tools—both academic and spiritual—to help her shine."
            </p>
            <p className="mt-6 font-semibold">— Dr Shehnaz Shaikh, Founder & Director</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
