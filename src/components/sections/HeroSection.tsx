import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { NeuralNetwork } from '../animations/NeuralNetwork';
import { useTypewriter } from '../../hooks/useTypewriter';

export function HeroSection() {
  const { text: typewriterText } = useTypewriter({
    words: [
      'Machine Learning Practitioner',
      'Deep Learning Developer',
      'Healthcare AI Specialist',
      'Data Science Expert'
    ],
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    loop: true,
  });

  return (
    <Section id="hero" fullHeight className="relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FFF5F2' }}>
      {/* Neural Network Background */}
      <NeuralNetwork className="opacity-30" animated />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{ color: '#064232' }}
        >
          Sayantika Laskar
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center font-medium"
          style={{ color: '#568F87' }}
        >
          <span className="font-medium">
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-0.5 h-6 ml-1"
              style={{ backgroundColor: '#568F87' }}
            />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#064232' }}
        >
          Developing modern ML and deep learning solutions for health-based and other problems,
          transforming complex data into actionable insights that make a real-world impact.
        </motion.p>

        {/* Skill Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 transition-all duration-300"
            style={{
              backgroundColor: '#F5BABB',
              borderColor: '#568F87',
              color: '#064232'
            }}
          >
            <span className="font-semibold text-sm sm:text-base">
              Machine Learning
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 transition-all duration-300"
            style={{
              backgroundColor: '#F5BABB',
              borderColor: '#568F87',
              color: '#064232'
            }}
          >
            <span className="font-semibold text-sm sm:text-base">
              Deep Learning
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 transition-all duration-300"
            style={{
              backgroundColor: '#F5BABB',
              borderColor: '#568F87',
              color: '#064232'
            }}
          >
            <span className="font-semibold text-sm sm:text-base">
              Healthcare AI
            </span>
          </motion.div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-semibold rounded-full transition-all duration-300 border-2"
            style={{
              backgroundColor: '#568F87',
              color: '#FFF5F2',
              borderColor: '#064232'
            }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-semibold rounded-full transition-all duration-300 border-2"
            style={{
              backgroundColor: '#FFF5F2',
              color: '#064232',
              borderColor: '#568F87'
            }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
}