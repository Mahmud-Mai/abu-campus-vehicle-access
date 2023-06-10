## INTRO

This project outlines the development of a mobile-based vehicle access control system for university premises. The system will use Optical Character Recognition (OCR) technology through smartphone cameras to scan vehicle plate numbers and make real-time decisions on granting or denying access. The project will be implemented using MERN Stack.

// A universal Regex to match both forward facing and reversed plate numbers
const regex = /^([A-Z]{3})(-)([0-9]{3})([A-Z]{2})$|^([0-9]{3})(-)([A-Z]{2})(-)([A-Z]{3})$/;
