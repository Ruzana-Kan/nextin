/* ===== Bangla mode + top pop-up ===== */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var D=[
['Skip to content','মূল অংশে যান'],
['Courses','কোর্সসমূহ'],['How it works','কীভাবে কাজ করে'],['About','আমাদের সম্পর্কে'],['Team','টিম'],['FAQ','প্রশ্নোত্তর'],['Contact','যোগাযোগ'],
['Enroll now','এখনই ভর্তি হন'],['Menu','মেনু'],['Intro','পরিচিতি'],['Process','প্রক্রিয়া'],
['( Chapter 1 / Intro )','( অধ্যায় ১ / পরিচিতি )'],['Start with','শুরু করুন'],
['AI & Prompt Engineering','এআই ও প্রম্পট ইঞ্জিনিয়ারিং'],['Digital Marketing','ডিজিটাল মার্কেটিং'],['Web Development','ওয়েব ডেভেলপমেন্ট'],
['Live on Google Meet','গুগল মিটে লাইভ'],['8 weeks','৮ সপ্তাহ'],['From ৳999','৳999 থেকে'],['Scroll to discover','স্ক্রল করুন'],
['( Chapter 2 / Relief · Live courses, ৳999 each today )','( অধ্যায় ২ / স্বস্তি · লাইভ কোর্স, আজ প্রতিটি ৳999 )'],
['Live online AI & Prompt Engineering, Digital Marketing and Web Development courses for youth in Bangladesh. 8 weeks, 2 classes a week on Google Meet, with real projects you can show.','বাংলাদেশের তরুণদের জন্য লাইভ অনলাইন এআই ও প্রম্পট ইঞ্জিনিয়ারিং, ডিজিটাল মার্কেটিং এবং ওয়েব ডেভেলপমেন্ট কোর্স। ৮ সপ্তাহ, সপ্তাহে ২টি ক্লাস গুগল মিটে, সঙ্গে দেখানোর মতো বাস্তব প্রজেক্ট।'],
['See the curriculum','কারিকুলাম দেখুন'],
['( Chapter 3 / Courses )','( অধ্যায় ৩ / কোর্স )'],['Pick your path.','আপনার পথ বেছে নিন।'],
['Course 01','কোর্স ০১'],['Course 02','কোর্স ০২'],['Course 03','কোর্স ০৩'],
['Web Design & Development, Level 1','ওয়েব ডিজাইন ও ডেভেলপমেন্ট, লেভেল ১'],
['Master the art of AI communication, prompt design, and optimization for real-world tools.','এআই-এর সঙ্গে যোগাযোগ, প্রম্পট ডিজাইন ও বাস্তব টুলের জন্য অপ্টিমাইজেশনের কৌশল আয়ত্ত করুন।'],
['Learn SEO, social media growth, and campaign strategy to market products online.','অনলাইনে পণ্য বিক্রির জন্য এসইও, সোশ্যাল মিডিয়া গ্রোথ ও ক্যাম্পেইন কৌশল শিখুন।'],
['Go from zero to building real websites with HTML, CSS, JavaScript and modern frameworks.','শূন্য থেকে শুরু করে HTML, CSS, জাভাস্ক্রিপ্ট ও আধুনিক ফ্রেমওয়ার্কে বাস্তব ওয়েবসাইট তৈরি করুন।'],
['8 weeks · 2 classes a week · Live on Google Meet','৮ সপ্তাহ · সপ্তাহে ২টি ক্লাস · গুগল মিটে লাইভ'],
['Prev','আগের'],['Next','পরের'],['8 Weeks','৮ সপ্তাহ ব্যাপী'],
['( Chapter 4 / Outcome )','( অধ্যায় ৪ / ফলাফল )'],
['( By the numbers )','( সংখ্যায় )'],['Simple. Clear. Live.','সহজ। স্পষ্ট। লাইভ।'],
['Live courses','লাইভ কোর্স'],['Weeks each','প্রতিটি কোর্স সপ্তাহ'],['Live classes per course','প্রতি কোর্সে লাইভ ক্লাস'],['Launch price per course','প্রতি কোর্সের লঞ্চ মূল্য'],
['( Chapter 5 / Students )','( অধ্যায় ৫ / শিক্ষার্থী )'],['Real people. Real classes.','সত্যিকারের মানুষ। সত্যিকারের ক্লাস।'],
['NeXT Innovation customer','NeXT Innovation-এর গ্রাহক'],
['· Scroll to rotate · Drag or move to tilt','· ঘোরাতে স্ক্রল করুন · টেনে বা নাড়িয়ে হেলান'],
['reviews','রিভিউ'],['Read all on Google','গুগলে সব পড়ুন'],
['( Courses / Curriculum )','( কোর্স / কারিকুলাম )'],['Three live courses. Pick your track.','তিনটি লাইভ কোর্স। আপনার ট্র্যাক বেছে নিন।'],
['Every course runs for 8 weeks with two live classes a week. Open a course to see all 16 classes before you enrol.','প্রতিটি কোর্স ৮ সপ্তাহের, সপ্তাহে দুটি লাইভ ক্লাস। ভর্তির আগে কোর্স খুলে ১৬টি ক্লাসই দেখে নিন।'],
['length','মেয়াদ'],['2 classes','২টি ক্লাস'],['a week','প্রতি সপ্তাহে'],['1.5 hours','১.৫ ঘণ্টা'],['per class','প্রতি ক্লাসে'],['Live','লাইভ'],['on Google Meet','গুগল মিটে'],
['You save 78%','আপনি সাশ্রয় করছেন ৭৮%'],['You save 67%','আপনি সাশ্রয় করছেন ৬৭%'],['You save 75%','আপনি সাশ্রয় করছেন ৭৫%'],
['Curriculum: all 16 classes','কারিকুলাম: সব ১৬টি ক্লাস'],
['Enroll in AI & Prompt Engineering','এআই ও প্রম্পট ইঞ্জিনিয়ারিং-এ ভর্তি হন'],['Enroll in Digital Marketing','ডিজিটাল মার্কেটিং-এ ভর্তি হন'],['Enroll in Web Design & Development, Level 1','ওয়েব ডিজাইন ও ডেভেলপমেন্ট, লেভেল ১-এ ভর্তি হন'],
/* AI curriculum */
['Orientation: Careers in AI & Prompt Engineering','ওরিয়েন্টেশন: এআই ও প্রম্পট ইঞ্জিনিয়ারিং-এ ক্যারিয়ার'],
['Anatomy of a Perfect Prompt','একটি নিখুঁত প্রম্পটের গঠন'],
['Advanced Prompt Structure & Formatting','উন্নত প্রম্পট কাঠামো ও ফরম্যাটিং'],
['Research-Based Prompting','গবেষণাভিত্তিক প্রম্পটিং'],
['Chain-of-Thought (CoT) & Reasoning','চেইন-অব-থট (CoT) ও যুক্তি'],
['Prompt Chaining & Iterative Refinement','প্রম্পট চেইনিং ও ধাপে ধাপে উন্নয়ন'],
['Negative Prompting & Guardrails','নেগেটিভ প্রম্পটিং ও গার্ডরেইল'],
['Mid-Term Project: The Expert Consultant','মিড-টার্ম প্রজেক্ট: বিশেষজ্ঞ পরামর্শক'],
['Introduction to AI Agents','এআই এজেন্টের পরিচিতি'],
['Building No-Code Workflows','নো-কোড ওয়ার্কফ্লো তৈরি'],
['Multi-Agent Systems & Orchestration','মাল্টি-এজেন্ট সিস্টেম ও অর্কেস্ট্রেশন'],
['Image & Multimodal Prompting','ইমেজ ও মাল্টিমোডাল প্রম্পটিং'],
['AI Safety, Ethics & Jailbreak Defense','এআই নিরাপত্তা, নৈতিকতা ও জেলব্রেক প্রতিরোধ'],
['Project-Based Learning','প্রজেক্টভিত্তিক শিক্ষা'],
['Job Hunt Strategy','চাকরি খোঁজার কৌশল'],
/* Marketing curriculum */
['Orientation: Careers in Digital Marketing, Salary Ranges','ওরিয়েন্টেশন: ডিজিটাল মার্কেটিং-এ ক্যারিয়ার ও বেতনের পরিসর'],
['Keyword Research','কীওয়ার্ড রিসার্চ'],['SEO','এসইও'],
['Competitor Research & SMM Strategy','প্রতিযোগী বিশ্লেষণ ও এসএমএম কৌশল'],
['Facebook Marketing','ফেসবুক মার্কেটিং'],['LinkedIn Marketing','লিংকডইন মার্কেটিং'],['Instagram & X Marketing','ইনস্টাগ্রাম ও এক্স মার্কেটিং'],
['Q&A / Review Session','প্রশ্নোত্তর / রিভিউ সেশন'],['SEM (Search Engine Marketing)','এসইএম (সার্চ ইঞ্জিন মার্কেটিং)'],
['Email Marketing','ইমেইল মার্কেটিং'],['Lead Generation & Ad Nurturing','লিড জেনারেশন ও বিজ্ঞাপনের মাধ্যমে লালন'],
['WordPress','ওয়ার্ডপ্রেস'],['Freelancing Platforms','ফ্রিল্যান্সিং প্ল্যাটফর্ম'],['Affiliate Marketing','অ্যাফিলিয়েট মার্কেটিং'],
['Real-Time Income Practicum','রিয়েল-টাইম আয়ের হাতেকলমে প্র্যাকটিকাম'],['Job Readiness','চাকরির প্রস্তুতি'],
/* Web curriculum */
['Orientation + Project: Plan Your First Website','ওরিয়েন্টেশন + প্রজেক্ট: আপনার প্রথম ওয়েবসাইটের পরিকল্পনা'],
['HTML Fundamentals + Project: Build a Bio Page with Semantic HTML','HTML-এর মৌলিক বিষয় + প্রজেক্ট: সেম্যান্টিক HTML দিয়ে বায়ো পেজ তৈরি'],
['HTML Forms, Tables & Media + Project: Contact Form & Media Gallery Page','HTML ফর্ম, টেবিল ও মিডিয়া + প্রজেক্ট: কন্টাক্ট ফর্ম ও মিডিয়া গ্যালারি পেজ'],
['CSS Fundamentals + Project: Style the Bio Page (Colors, Box Model, Selectors)','CSS-এর মৌলিক বিষয় + প্রজেক্ট: বায়ো পেজ স্টাইল করা (রং, বক্স মডেল, সিলেক্টর)'],
['CSS Flexbox + Project: Build a Navigation Bar & Card Layout','CSS ফ্লেক্সবক্স + প্রজেক্ট: নেভিগেশন বার ও কার্ড লেআউট তৈরি'],
['CSS Grid & Responsive Design + Project: Responsive Photo Gallery','CSS গ্রিড ও রেসপনসিভ ডিজাইন + প্রজেক্ট: রেসপনসিভ ফটো গ্যালারি'],
['Project 1: Personal Portfolio Page (Design & Build)','প্রজেক্ট ১: পার্সোনাল পোর্টফোলিও পেজ (ডিজাইন ও তৈরি)'],
['JavaScript Basics + Project: Interactive Calculator','জাভাস্ক্রিপ্টের বেসিক + প্রজেক্ট: ইন্টারেক্টিভ ক্যালকুলেটর'],
['JavaScript DOM & Events + Project: To-Do List App','জাভাস্ক্রিপ্ট DOM ও ইভেন্ট + প্রজেক্ট: টু-ডু লিস্ট অ্যাপ'],
['JavaScript Forms & Validation + Project: Live Form Validator','জাভাস্ক্রিপ্ট ফর্ম ও ভ্যালিডেশন + প্রজেক্ট: লাইভ ফর্ম ভ্যালিডেটর'],
['Bootstrap / Tailwind CSS + Project: Rebuild Portfolio with a Framework','বুটস্ট্র্যাপ / টেইলউইন্ড CSS + প্রজেক্ট: ফ্রেমওয়ার্কে পোর্টফোলিও নতুন করে তৈরি'],
['Intro to React + Project: Build Your First Component','React-এর পরিচিতি + প্রজেক্ট: আপনার প্রথম কম্পোনেন্ট তৈরি'],
['React State & Props + Project: Interactive Product Card App','React State ও Props + প্রজেক্ট: ইন্টারেক্টিভ প্রোডাক্ট কার্ড অ্যাপ'],
['Project 2: Responsive Business Landing Page (Design & Build)','প্রজেক্ট ২: রেসপনসিভ বিজনেস ল্যান্ডিং পেজ (ডিজাইন ও তৈরি)'],
['Final Project: Full Multi-Page Website with JavaScript','ফাইনাল প্রজেক্ট: জাভাস্ক্রিপ্টসহ পূর্ণাঙ্গ মাল্টি-পেজ ওয়েবসাইট'],
['Deployment + Project: Publish Your Website Live & Build Your Portfolio','ডিপ্লয়মেন্ট + প্রজেক্ট: ওয়েবসাইট লাইভ প্রকাশ ও পোর্টফোলিও তৈরি'],
/* Why */
['( What you get / Overview )','( আপনি কী পাবেন / সারসংক্ষেপ )'],['No guesswork.','আন্দাজের কিছু নেই।'],
['You can see the classes, the price and the people before you enrol.','ভর্তির আগেই ক্লাস, মূল্য ও মানুষগুলোকে দেখে নিতে পারবেন।'],
['Live teaching','লাইভ পাঠদান'],
['Ask questions in the moment. Classes run on Google Meet, twice a week, about 1.5 hours each. Recordings arrive within 2 days.','তখনই প্রশ্ন করুন। ক্লাস হয় গুগল মিটে, সপ্তাহে দুবার, প্রতিটি প্রায় ১.৫ ঘণ্টার। রেকর্ডিং ২ দিনের মধ্যে পেয়ে যাবেন।'],
['Clear curriculum','স্পষ্ট কারিকুলাম'],
['Open any curriculum and read every class, one by one, before you pay.','টাকা দেওয়ার আগে যেকোনো কারিকুলাম খুলে প্রতিটি ক্লাস একে একে পড়ে নিন।'],
['Real projects','বাস্তব প্রজেক্ট'],
['Prompt engineering, AI agents, HTML, CSS, JavaScript, React, SEO, email and social marketing, freelancing and portfolio projects.','প্রম্পট ইঞ্জিনিয়ারিং, এআই এজেন্ট, HTML, CSS, জাভাস্ক্রিপ্ট, React, এসইও, ইমেইল ও সোশ্যাল মার্কেটিং, ফ্রিল্যান্সিং এবং পোর্টফোলিও প্রজেক্ট।'],
['Finish with a next step','শেষ করুন পরবর্তী ধাপ নিয়ে'],
['AI: Job Hunt Strategy. Marketing: Real-Time Income Practicum and Job Readiness. Web: publish your website live and build your portfolio.','এআই: চাকরি খোঁজার কৌশল। মার্কেটিং: রিয়েল-টাইম আয়ের প্র্যাকটিকাম ও চাকরির প্রস্তুতি। ওয়েব: ওয়েবসাইট লাইভ প্রকাশ ও পোর্টফোলিও তৈরি।'],
/* How */
['( How it works / Process )','( কীভাবে কাজ করে / প্রক্রিয়া )'],['Four steps.','চারটি ধাপ।'],
['Choose a course','একটি কোর্স বেছে নিন'],['Compare the three tracks and read the class-by-class curriculum.','তিনটি ট্র্যাক তুলনা করুন এবং ক্লাসভিত্তিক কারিকুলাম পড়ুন।'],
['Enrol with the form','ফর্মে ভর্তি হন'],['Fill in our short Google Form. Each course is ৳999 today.','আমাদের ছোট গুগল ফর্মটি পূরণ করুন। প্রতিটি কোর্স আজ ৳999।'],
['Join live','লাইভে যোগ দিন'],['Two classes a week, 1.5 hours each, on Google Meet with an instructor.','সপ্তাহে দুটি ক্লাস, প্রতিটি ১.৫ ঘণ্টার, গুগল মিটে ইনস্ট্রাক্টরের সঙ্গে।'],
['Build and finish strong','তৈরি করুন, দারুণভাবে শেষ করুন'],['Work on projects, then close with a portfolio or job-readiness session.','প্রজেক্টে কাজ করুন, তারপর পোর্টফোলিও বা চাকরির প্রস্তুতি সেশন দিয়ে শেষ করুন।'],
/* About */
['( About / Mission )','( আমাদের সম্পর্কে / লক্ষ্য )'],
['We help young people in Bangladesh learn programming and AI, and put them to work.','আমরা বাংলাদেশের তরুণদের প্রোগ্রামিং ও এআই শিখতে এবং কাজে লাগাতে সাহায্য করি।'],
["At NeXT Innovation, we're passionate about empowering the next generation with cutting-edge programming and AI knowledge. Our mission is to bridge the gap between traditional education and the rapidly evolving tech landscape.",'NeXT Innovation-এ আমরা আধুনিক প্রোগ্রামিং ও এআই জ্ঞান দিয়ে নতুন প্রজন্মকে শক্তিশালী করতে আগ্রহী। আমাদের লক্ষ্য প্রচলিত শিক্ষা এবং দ্রুত বদলে যাওয়া প্রযুক্তির জগতের মধ্যে ব্যবধান ঘোচানো।'],
["We believe that every young mind has the potential to innovate and create solutions that will shape our future. Through our comprehensive courses and expert guidance, we're building a community of tech-savvy individuals ready to tackle tomorrow's challenges.",'আমরা বিশ্বাস করি প্রতিটি তরুণ মনেই উদ্ভাবনের এবং ভবিষ্যৎ গড়ার সমাধান তৈরির সম্ভাবনা আছে। আমাদের পূর্ণাঙ্গ কোর্স ও বিশেষজ্ঞ দিকনির্দেশনার মাধ্যমে আমরা এমন একটি প্রযুক্তি-সচেতন কমিউনিটি গড়ে তুলছি, যারা আগামীর চ্যালেঞ্জ মোকাবিলায় প্রস্তুত।'],
['Modern curriculum','আধুনিক কারিকুলাম'],['The latest programming languages, AI frameworks, and industry best practices.','সর্বশেষ প্রোগ্রামিং ভাষা, এআই ফ্রেমওয়ার্ক ও ইন্ডাস্ট্রির সেরা চর্চা।'],
['Expert instructors','অভিজ্ঞ ইনস্ট্রাক্টর'],['Industry professionals with real-world experience in tech and AI development.','প্রযুক্তি ও এআই ডেভেলপমেন্টে বাস্তব অভিজ্ঞতাসম্পন্ন ইন্ডাস্ট্রি পেশাজীবী।'],
['Practical projects','হাতেকলমে প্রজেক্ট'],['Build real-world applications and gain hands-on experience in live sessions.','লাইভ সেশনে বাস্তব অ্যাপ্লিকেশন তৈরি করুন এবং হাতেকলমে অভিজ্ঞতা অর্জন করুন।'],
['Community driven','কমিউনিটিনির্ভর'],['Learners, mentors and tech enthusiasts supporting each other.','শিক্ষার্থী, মেন্টর ও প্রযুক্তিপ্রেমীরা একে অপরকে সহায়তা করছে।'],
['Read our Google reviews','আমাদের গুগল রিভিউ পড়ুন'],
/* Team */
['( Team / People )','( টিম / মানুষ )'],['The people behind NeXT Innovation.','NeXT Innovation-এর পেছনের মানুষগুলো।'],
['Meet the team that plans, teaches and supports every course.','যে টিম প্রতিটি কোর্সের পরিকল্পনা, পাঠদান ও সহায়তা করে, তাদের সঙ্গে পরিচিত হন।'],
['Md. Ruhul Amin','মো. রুহুল আমিন'],['Ruzana Khan','রুজানা খান'],['Runa Khan','রুনা খান'],['Shahzaadee Shikder Nafisa','শাহজাদী শিকদার নাফিসা'],['Md Farhan Shahriar','মো. ফারহান শাহরিয়ার'],
['Chairman','চেয়ারম্যান'],['CEO & Founder','সিইও ও প্রতিষ্ঠাতা'],['Executive Adviser & Creative Director','নির্বাহী উপদেষ্টা ও ক্রিয়েটিভ ডিরেক্টর'],['Social Media Management Head','সোশ্যাল মিডিয়া ম্যানেজমেন্ট প্রধান'],['Content Associate','কনটেন্ট অ্যাসোসিয়েট'],
/* FAQ */
['( FAQ / Answers )','( প্রশ্নোত্তর )'],['Questions, answered.','আপনার প্রশ্নের উত্তর।'],
['Are the classes live or recorded?','ক্লাস কি লাইভ নাকি রেকর্ডেড?'],
['All three current courses are taught live on Google Meet. Each course runs for 8 weeks, with 2 classes a week of about 1.5 hours each. You will get the recordings within 2 days after the class.','বর্তমান তিনটি কোর্সই গুগল মিটে লাইভ পড়ানো হয়। প্রতিটি কোর্স ৮ সপ্তাহের, সপ্তাহে ২টি ক্লাস, প্রতিটি প্রায় ১.৫ ঘণ্টার। ক্লাসের পর ২ দিনের মধ্যে রেকর্ডিং পেয়ে যাবেন।'],
['Do I need any experience before joining?','যোগ দেওয়ার আগে কি অভিজ্ঞতা লাগবে?'],
['Digital Marketing and Web Design & Development – Level 1 are built for beginners, and Web Design starts from zero with HTML. AI & Prompt Engineering begins with the fundamentals of writing a good prompt.','ডিজিটাল মার্কেটিং এবং ওয়েব ডিজাইন ও ডেভেলপমেন্ট – লেভেল ১ নতুনদের জন্য তৈরি, ওয়েব ডিজাইন শুরু হয় HTML দিয়ে একদম শূন্য থেকে। এআই ও প্রম্পট ইঞ্জিনিয়ারিং শুরু হয় ভালো প্রম্পট লেখার মৌলিক বিষয় দিয়ে।'],
['How much do the courses cost?','কোর্সের খরচ কত?'],
['Each live course is currently ৳999. The regular prices are ৳4,500 for AI & Prompt Engineering, ৳3,000 for Digital Marketing and ৳4,000 for Web Design & Development – Level 1.','প্রতিটি লাইভ কোর্স এখন ৳999। নিয়মিত মূল্য এআই ও প্রম্পট ইঞ্জিনিয়ারিং ৳4,500, ডিজিটাল মার্কেটিং ৳3,000 এবং ওয়েব ডিজাইন ও ডেভেলপমেন্ট – লেভেল ১ ৳4,000।'],
['How do I enroll?','কীভাবে ভর্তি হব?'],
['Use any Enroll button on this site to open our enrolment form. If you have questions first, message us by email or WhatsApp.','এই সাইটের যেকোনো ভর্তি বাটনে ক্লিক করে আমাদের ভর্তি ফর্ম খুলুন। আগে কোনো প্রশ্ন থাকলে ইমেইল বা হোয়াটসঅ্যাপে মেসেজ করুন।'],
['Where can I see what each course covers?','প্রতিটি কোর্সে কী কী আছে কোথায় দেখব?'],
['Open the Curriculum panel on any course to see all 16 classes, one by one.','যেকোনো কোর্সের কারিকুলাম প্যানেল খুলে ১৬টি ক্লাসই একে একে দেখুন।'],
['Who are the courses for?','কোর্সগুলো কাদের জন্য?'],
['Youth and beginners in Bangladesh who want to learn programming, AI and digital skills. Classes are online, so you can join from anywhere.','বাংলাদেশের তরুণ ও নতুনরা, যারা প্রোগ্রামিং, এআই ও ডিজিটাল দক্ষতা শিখতে চান। ক্লাস অনলাইনে, তাই যেকোনো জায়গা থেকে যোগ দিতে পারবেন।'],
['Mission log','মিশন লগ'],
['( Act 1 / The signal )','( পর্ব ১ / সংকেত )'],['The world is switching to AI.','পৃথিবী এখন এআই-এর দিকে ঝুঁকছে।'],
['Offices, shops and studios already use it every day. Many classrooms are still catching up.','অফিস, দোকান ও স্টুডিও আজ প্রতিদিনই এআই ব্যবহার করছে। অনেক ক্লাসরুম এখনো তাল মেলাতে পারছে না।'],
['( Act 2 / The gap )','( পর্ব ২ / ব্যবধান )'],['Every month, the gap grows.','প্রতি মাসে ব্যবধান বাড়ছে।'],
["People who can work with AI move faster. The distance is widening, and it isn't about talent. It is about who starts learning.",'যারা এআই-এর সঙ্গে কাজ করতে পারেন, তারা এগিয়ে যান দ্রুত। দূরত্ব বাড়ছে, আর এটা প্রতিভার বিষয় নয়। বিষয়টা হলো কে আগে শেখা শুরু করছে।'],
['( Act 3 / Ignition )','( পর্ব ৩ / ইগনিশন )'],['So we built a live classroom.','তাই আমরা তৈরি করেছি লাইভ ক্লাসরুম।'],
['Real instructors on Google Meet. Two classes a week for eight weeks. Questions answered on the spot.','গুগল মিটে বাস্তব ইনস্ট্রাক্টর। আট সপ্তাহ ধরে সপ্তাহে দুটি ক্লাস। প্রশ্নের উত্তর সঙ্গে সঙ্গে।'],
['( Act 4 / Orbit )','( পর্ব ৪ / কক্ষপথ )'],['Three tracks. One mission.','তিনটি ট্র্যাক। একটি মিশন।'],
['AI & Prompt Engineering, Digital Marketing or Web Development. Pick one and build real projects as you learn.','এআই ও প্রম্পট ইঞ্জিনিয়ারিং, ডিজিটাল মার্কেটিং অথবা ওয়েব ডেভেলপমেন্ট। একটি বেছে নিন এবং শিখতে শিখতে বাস্তব প্রজেক্ট বানান।'],
['( Act 5 / Landing )','( পর্ব ৫ / অবতরণ )'],['Land with skills you can show.','এমন দক্ষতা নিয়ে অবতরণ করুন, যা দেখানো যায়।'],
['Finish with a portfolio, real projects and a clear next step. Each course is ৳999 today.','শেষ করুন পোর্টফোলিও, বাস্তব প্রজেক্ট ও স্পষ্ট পরবর্তী ধাপ নিয়ে। প্রতিটি কোর্স আজ ৳999।'],
['Signal','সংকেত'],['Gap','ব্যবধান'],['Ignition','ইগনিশন'],['Orbit','কক্ষপথ'],['Landing','অবতরণ'],
['Mission T+','মিশন T+'],['Alt','উচ্চতা'],['Systems nominal','সিস্টেম স্বাভাবিক'],
['Turn music off','মিউজিক বন্ধ করুন'],['Turn music on','মিউজিক চালু করুন'],['Back to top','উপরে ফিরুন'],['Chat with us on WhatsApp','হোয়াটসঅ্যাপে আমাদের সঙ্গে চ্যাট করুন'],
['Previous course','আগের কোর্স'],['Next course','পরের কোর্স'],['Course 1','কোর্স ১'],['Course 2','কোর্স ২'],['Course 3','কোর্স ৩'],
['Act 1','পর্ব ১'],['Act 2','পর্ব ২'],['Act 3','পর্ব ৩'],['Act 4','পর্ব ৪'],['Act 5','পর্ব ৫'],['Close','বন্ধ করুন'],['Sections','সেকশনসমূহ'],['Main','প্রধান'],
/* Contact + footer */
['Have a question? Message us directly.','প্রশ্ন আছে? সরাসরি মেসেজ করুন।'],
['Reach us on email or WhatsApp, whichever is easier.','ইমেইল বা হোয়াটসঅ্যাপে যেটা সহজ, সেখানেই আমাদের সঙ্গে যোগাযোগ করুন।'],
['Email: nextinhq@gmail.com','ইমেইল: nextinhq@gmail.com'],['WhatsApp: +880 1347-139231','হোয়াটসঅ্যাপ: +880 1347-139231'],
['Live online tech courses for youth in Bangladesh.','বাংলাদেশের তরুণদের জন্য লাইভ অনলাইন টেক কোর্স।']
];
var M={},R={};
function nk(s){return s.replace(/\s+/g,' ').trim()}
D.forEach(function(p){M[nk(p[0])]=p[1];R[nk(p[1])]=nk(p[0])});
function map(s,bn){var m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);if(!m[2])return s;var k=nk(m[2]),v=bn?M[k]:R[k];return v==null?s:m[1]+v+m[3]}
window.__trs=function(s){return map(s,!!window.__bn)};
var SKIP='script,style,noscript,.rollw,[data-bn],.rcard q,#loader,.cn,.lang,.gcnt,.sidx .cnt';
function walk(bn){
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentElement;if(!p||p.closest(SKIP))return 2;return n.nodeValue.trim()?1:2}}),a=[],n;
 while((n=w.nextNode()))a.push(n);
 a.forEach(function(n){var v=map(n.nodeValue,bn);if(v!==n.nodeValue)n.nodeValue=v})}
var TT_EN=document.title,TT_BN='NeXT Innovation: বাংলাদেশে লাইভ এআই, মার্কেটিং ও ওয়েব কোর্স';
function setLang(bn,save){
 window.__bn=bn?1:0;document.documentElement.lang=bn?'bn':'en';
 if(bn&&window.__ptKill)window.__ptKill();
 walk(bn);
 $$('[data-bn]').forEach(function(el){if(bn){if(el._en==null)el._en=el.innerHTML;el.innerHTML=el.getAttribute('data-bn')}else if(el._en!=null){el.innerHTML=el._en}});
 var b=$('#langBtn');if(b)b.textContent=bn?'English':'বাংলা';
 $$('[aria-label]').forEach(function(el){if(el.id==='langBtn')return;var v=el.getAttribute('aria-label'),m=map(v,bn);if(m!==v)el.setAttribute('aria-label',m)});
 document.title=bn?TT_BN:TT_EN;
 if(window.__rollRefresh)window.__rollRefresh();
 if(save){try{localStorage.setItem('nx-lang',bn?'bn':'en')}catch(e){}}
 setTimeout(function(){window.dispatchEvent(new Event('resize'));if(window.ScrollTrigger)ScrollTrigger.refresh()},80)}
var lb=$('#langBtn');
if(lb)lb.addEventListener('click',function(){setLang(!window.__bn,true)});
if(window.__bn)setLang(true,false);

/* story controller: scroll progress through the pinned scene drives the beats */
(function(){
 var s=document.getElementById('story');if(!s)return;
 var beats=$$('.beat',s),dots=$$('.story-rail button',s),fill=$('.story-rail .trk i',s),cnt=$('.sn',s),n=beats.length,cur=-1;
 window.__story={p:0};
 function upd(){
  var r=s.getBoundingClientRect(),tot=s.offsetHeight-innerHeight,p=Math.max(0,Math.min(1,tot>0?-r.top/tot:0));
  window.__story.p=p;var idx=Math.min(n-1,Math.floor(p*n));
  if(idx!==cur){if(cur>=0&&window.__snd)window.__snd.chime(idx);cur=idx;
   beats.forEach(function(b,i){b.classList.toggle('on',i===idx);b.classList.toggle('past',i<idx)});
   dots.forEach(function(d,i){d.setAttribute('aria-current',i===idx?'true':'false')});
   if(cnt)cnt.textContent='0'+(idx+1)+' / 0'+n}
  if(fill)fill.style.transform='scaleX('+p+')'}
 addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
 dots.forEach(function(d,i){d.addEventListener('click',function(){
  var tot=s.offsetHeight-innerHeight,top=scrollY+s.getBoundingClientRect().top;
  window.scrollTo(0,top+(i+.5)/n*tot)})});
})();

/* 3D orbital station (Three.js), the stage of the scroll story */
(function(){
 if(!window.THREE||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 var host=document.getElementById('story');if(!host)return;
 try{
  var cv=document.createElement('canvas');cv.className='station';cv.setAttribute('aria-hidden','true');(host.querySelector('.story-pin')||host).appendChild(cv);
  var gl=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});gl.setPixelRatio(Math.min(devicePixelRatio||1,2));
  var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.set(0,0,9.5);
  var grp=new THREE.Group();scene.add(grp);
  var MINT=0x54e0c4,SKY=0x81a1f8,LIL=0xb69cff;
  function wire(geo,col,op){return new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:col,transparent:true,opacity:op}))}
  /* core + shell */
  var core=wire(new THREE.IcosahedronGeometry(1.05,1),MINT,.95);grp.add(core);
  var glow=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,0),new THREE.MeshBasicMaterial({color:LIL,transparent:true,opacity:.22}));grp.add(glow);
  var shell=wire(new THREE.IcosahedronGeometry(1.85,1),SKY,.35);grp.add(shell);
  /* spokes with solar panels */
  [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].forEach(function(v,i){
   var pts=[new THREE.Vector3(),new THREE.Vector3(v[0]*2.5,v[1]*2.5,v[2]*2.5)];
   grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:SKY,transparent:true,opacity:.45})));
   var panel=wire(new THREE.BoxGeometry(.9,.02,.55),i%2?MINT:LIL,.8);panel.position.set(v[0]*2.5,v[1]*2.5,v[2]*2.5);
   if(v[0]===0&&v[1]===0)panel.rotation.x=Math.PI/2;if(v[1]!==0)panel.rotation.z=Math.PI/2;grp.add(panel)});
  /* three tilted orbit rings, each with a satellite */
  var pivots=[];
  [[2.7,.0,.5,MINT,.7],[3.2,1.1,-.3,SKY,-.5],[3.7,-.8,1.2,LIL,.35]].forEach(function(o){
   var tilt=new THREE.Group();tilt.rotation.x=o[1];tilt.rotation.y=o[2];grp.add(tilt);
   var piv=new THREE.Group();tilt.add(piv);
   piv.add(new THREE.Mesh(new THREE.TorusGeometry(o[0],.012,6,180),new THREE.MeshBasicMaterial({color:o[3],transparent:true,opacity:.6})));
   var sat=wire(new THREE.OctahedronGeometry(.2,0),o[3],1);sat.position.set(o[0],0,0);piv.add(sat);
   var dot=new THREE.Mesh(new THREE.SphereGeometry(.05,8,8),new THREE.MeshBasicMaterial({color:0xffffff}));dot.position.set(o[0],0,0);piv.add(dot);
   pivots.push({p:piv,s:o[4],sat:sat})});
  /* particle halo */
  var N=700,pa=new Float32Array(N*3),i;
  for(i=0;i<N;i++){var u=Math.random()*2-1,t=Math.random()*6.283,r=Math.sqrt(1-u*u),R=3.9+Math.random()*1.4;pa[i*3]=r*Math.cos(t)*R;pa[i*3+1]=u*R;pa[i*3+2]=r*Math.sin(t)*R}
  var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
  var halo=new THREE.Points(pg,new THREE.PointsMaterial({color:MINT,size:.035,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(halo);
  /* keyframes per act: camera distance, x/y offset, brightness, speed, ring scale, ignition colour */
  var K=[{z:14,x:3.2,y:-.3,b:.3,s:.4,r:.55,c:0},{z:12,x:3,y:0,b:.5,s:.7,r:.75,c:.15},{z:9.5,x:2.6,y:0,b:1,s:1.2,r:1,c:1},{z:8.5,x:2.2,y:.1,b:1,s:2.2,r:1.12,c:1},{z:7,x:2.4,y:0,b:1.15,s:1,r:1,c:1}];
  var ROSE=new THREE.Color(0xff8fb8),MC=new THREE.Color(MINT),base=[];
  grp.traverse(function(o){if(o.material&&o.material!==glow.material)base.push([o.material,o.material.opacity])});base.push([halo.material,halo.material.opacity]);
  function storyState(){var p=window.__story?window.__story.p:0,n=K.length,tt=Math.max(0,Math.min(n-1,p*n-.5)),i=Math.min(n-2,Math.floor(tt)),f=tt-i;f=f*f*(3-2*f);var a=K[i],b=K[i+1],o={p:p};for(var k in a)o[k]=a[k]+(b[k]-a[k])*f;return o}
  function rs(){var w=cv.clientWidth||400,h=cv.clientHeight||400;gl.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
  rs();addEventListener('resize',rs);
  var mx=0,my=0,vis=true,spin=0,last=performance.now();
  addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
  new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(host);
  (function loop(t){requestAnimationFrame(loop);if(!vis||document.hidden){last=t;return}
   var dt=Math.min((t-last)/1000,.05);last=t;var sec=t/1000;
   var st=storyState(),small=innerWidth<900,B=st.b*(small?.65:1);
   cam.position.z+=(st.z-cam.position.z)*.08;
   var gx=small?0:st.x,gy=small?st.y+1.5:st.y;grp.position.x+=(gx-grp.position.x)*.08;grp.position.y+=(gy-grp.position.y)*.08;
   core.material.color.lerpColors(ROSE,MC,st.c);
   spin+=dt*.25*st.s;grp.rotation.y=spin+st.p*4;grp.rotation.x+=((my*.6+Math.sin(sec*.3)*.15)-grp.rotation.x)*.04;grp.rotation.z+=((-mx*.3)-grp.rotation.z)*.04;
   core.rotation.y-=dt*.5;core.rotation.x+=dt*.3;shell.rotation.y+=dt*.15;shell.rotation.z-=dt*.1;
   var pulse=1+Math.sin(sec*2)*.06;glow.scale.setScalar(pulse);glow.material.opacity=(.18+.1*Math.sin(sec*2))*B;
   pivots.forEach(function(o){o.p.rotation.z+=dt*o.s*st.s;o.p.scale.setScalar(st.r);o.sat.rotation.x+=dt*1.5;o.sat.rotation.y+=dt});
   halo.rotation.y-=dt*.05;halo.rotation.x+=dt*.02;
   halo.position.copy(grp.position);base.forEach(function(m){m[0].opacity=Math.min(1,m[1]*B)});
   gl.render(scene,cam)})(last);
 }catch(e){console.warn('3D station disabled:',e)}
})();

/* mission clock + altitude readout (scroll progress) */
(function(){
 var t=$('#hudT'),a=$('#hudA'),s0=Date.now();
 function p2(n){return('0'+n).slice(-2)}
 function upd(){var s=Math.floor((Date.now()-s0)/1000);if(t)t.textContent=p2(Math.floor(s/3600))+':'+p2(Math.floor(s/60)%60)+':'+p2(s%60);
  var h=document.documentElement.scrollHeight-innerHeight;if(a)a.textContent=('00'+Math.round(h>0?Math.min(scrollY/h,1)*100:0)).slice(-3)}
 setInterval(upd,1000);addEventListener('scroll',upd,{passive:true});upd()})();

/* space layer: drifting dust with scroll parallax, shooting stars, comet cursor trail */
(function(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 var cv=document.createElement('canvas');cv.className='fx';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
 var c=cv.getContext('2d'),W,H,D=Math.min(devicePixelRatio||1,2),mob=matchMedia('(max-width:760px)').matches;
 function rs(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;c.setTransform(D,0,0,D,0,0)}rs();addEventListener('resize',rs);
 var dust=[],N=mob?30:70,i,shots=[],trail=[],nextShot=1500,cols=['238,240,255','129,161,248','84,224,196','182,156,255'];
 for(i=0;i<N;i++)dust.push({x:Math.random()*W,y:Math.random()*H,z:.3+Math.random()*1.1,r:Math.random()*1.3+.4,tw:Math.random()*6.28,c:cols[i%4]});
 if(!mob)addEventListener('pointermove',function(e){trail.push({x:e.clientX,y:e.clientY,a:1})});
 var last=performance.now();
 (function loop(t){requestAnimationFrame(loop);if(document.hidden)return;
  var dt=Math.min(t-last,50);last=t;c.clearRect(0,0,W,H);
  var off=scrollY;
  dust.forEach(function(d){d.x-=.012*dt*d.z;if(d.x<-5)d.x=W+5;
   var y=((d.y-off*.22*d.z)%H+H)%H,al=.18+.4*(.5+.5*Math.sin(t*.0012*d.z+d.tw));
   c.fillStyle='rgba('+d.c+','+al.toFixed(2)+')';c.beginPath();c.arc(d.x,y,d.r*d.z,0,6.283);c.fill()});
  nextShot-=dt;
  if(nextShot<=0){nextShot=2500+Math.random()*4500;var sx=W*(.3+Math.random()*.7),sy=Math.random()*H*.45;shots.push({x:sx,y:sy,vx:-(.7+Math.random()*.5),vy:.38+Math.random()*.25,l:1})}
  for(i=shots.length-1;i>=0;i--){var s=shots[i];s.x+=s.vx*dt;s.y+=s.vy*dt;s.l-=dt*.0009;if(s.l<=0){shots.splice(i,1);continue}
   var tx=s.x-s.vx*180,ty=s.y-s.vy*180,g=c.createLinearGradient(s.x,s.y,tx,ty);g.addColorStop(0,'rgba(238,240,255,'+(.9*s.l).toFixed(2)+')');g.addColorStop(1,'rgba(129,161,248,0)');
   c.strokeStyle=g;c.lineWidth=1.6;c.beginPath();c.moveTo(s.x,s.y);c.lineTo(tx,ty);c.stroke()}
  for(i=trail.length-1;i>=0;i--){var p=trail[i];p.a-=dt*.0026;if(p.a<=0){trail.splice(i,1);continue}
   c.fillStyle='rgba(84,224,196,'+(p.a*.55).toFixed(2)+')';c.beginPath();c.arc(p.x,p.y,1+p.a*2.6,0,6.283);c.fill()}
 })(last)})();

/* back-to-top button: appears after scrolling, jumps to the top instantly */
var tt=$('#toTop');
if(tt){
 addEventListener('scroll',function(){tt.classList.toggle('show',scrollY>500)},{passive:true});
 tt.addEventListener('click',function(){window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0})}

})();
