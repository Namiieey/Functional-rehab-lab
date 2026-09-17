import { ServiceItem } from '../types';

/**
 * CLINIC SERVICE DIRECTORY
 * Note for Clinic Administrators:
 * These are sample service categories configured based on modern rehabilitation practice.
 * Replace or confirm specific clinic service names, durations, and descriptions in this file.
 */
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'musculoskeletal',
    title: 'Musculoskeletal Physiotherapy',
    category: 'Assessment & Therapy',
    iconName: 'Activity',
    description:
      'Targeted therapeutic assessment and management for acute or chronic muscle, tendon, and ligament conditions to restore joint alignment and pain-free movement.',
    suitableFor: ['Muscle strains', 'Tendonitis', 'Postural imbalances', 'Repetitive strain'],
  },
  {
    id: 'sports-injury',
    title: 'Sports Injury Rehabilitation',
    category: 'Athletic Recovery',
    iconName: 'Flame',
    description:
      'Structured athletic recovery pathways designed to safely take you from acute tissue recovery through sport-specific neuromuscular retraining and load tolerance.',
    suitableFor: ['Ligament sprains (ACL/PCL/Ankle)', 'Rotator cuff tears', 'Hamstring strains', 'Return-to-play testing'],
  },
  {
    id: 'post-operative',
    title: 'Post-Operative Rehabilitation',
    category: 'Surgical Recovery',
    iconName: 'HeartPulse',
    description:
      'Carefully staged rehabilitation protocols following orthopedic and joint procedures, focusing on swelling control, progressive mobility, and strength restoration.',
    suitableFor: ['Total knee/hip replacement', 'Arthroscopic repairs', 'Spinal surgeries', 'Fracture fixation recovery'],
  },
  {
    id: 'back-neck-pain',
    title: 'Back & Neck Pain Management',
    category: 'Spine Health',
    iconName: 'Shield',
    description:
      'Evidence-informed functional spine rehabilitation combining hands-on joint decompression techniques, deep core stabilization, and ergonomic movement correction.',
    suitableFor: ['Cervical radiculopathy', 'Lumbar disc herniation', 'Sciatica', 'Chronic desk posture pain'],
  },
  {
    id: 'joint-mobility',
    title: 'Joint & Mobility Rehabilitation',
    category: 'Movement Restoration',
    iconName: 'Compass',
    description:
      'Graduated mobilization and therapeutic stretching regimes to relieve joint stiffness, expand functional range of motion, and enhance synovial fluid movement.',
    suitableFor: ['Frozen shoulder (Adhesive capsulitis)', 'Knee osteoarthritis', 'Ankle impingement', 'Hip stiffness'],
  },
  {
    id: 'strength-conditioning',
    title: 'Strength & Conditioning',
    category: 'Functional Performance',
    iconName: 'Dumbbell',
    description:
      'Personalised kinetic conditioning to address functional deficits, build resilient tendon stiffness, and develop balanced physical endurance under clinical supervision.',
    suitableFor: ['Functional weakness', 'Injury prevention', 'Age-related muscle loss', 'Active lifestyle maintenance'],
  },
  {
    id: 'exercise-rehab',
    title: 'Exercise Rehabilitation',
    category: 'Movement Re-education',
    iconName: 'Sparkles',
    description:
      'Customized therapeutic exercise prescriptions calibrated to your individual biomechanics, movement dysfunctions, and daily lifestyle demands.',
    suitableFor: ['Gait re-education', 'Balance deficits', 'Core stability', 'Graduated home exercise therapy'],
  },
];
