import React, { useState } from 'react';
 
const CommunitySnapshot = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    communityIdea: '',
    communityTypes: [],
    communityName: '',
    audienceLocations: [],
    audienceNotes: '',
    launchTimeline: '',
    publicPrivate: '',
    pricing: '',
    pricingDetails: '',
    hasBrand: '',
    hasGraphics: '',
    hasLeaderboard: '',
    leaderboardIdeas: '',
    firstWin: '',
    events: [],
    eventIdeas: '',
    needsHelp: [],
    whatWouldHelp: '',
    hopesToWalkAway: []
  });

  const sections = [
    { id: 0, title: 'Your Community Idea', icon: '✨' },
    { id: 1, title: 'Your Current Audience', icon: '👥' },
    { id: 2, title: 'Your Skool Setup', icon: '🏡' },
    { id: 3, title: 'Your Brand + Build Pieces', icon: '🎨' },
    { id: 4, title: 'Your Member Experience', icon: '💫' },
    { id: 5, title: 'Where You Want Support', icon: '🤝' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generateSnapshot = async () => {
    // First, submit the data to Google Sheets
    await sendToGoHighLevel();
    
    // Then show the snapshot
    setShowSnapshot(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startOver = () => {
    setShowSnapshot(false);
    setCurrentSection(0);
    setFormData({
      name: '',
      email: '',
      communityIdea: '',
      communityTypes: [],
      communityName: '',
      audienceLocations: [],
      audienceNotes: '',
      launchTimeline: '',
      publicPrivate: '',
      pricing: '',
      pricingDetails: '',
      hasBrand: '',
      hasGraphics: '',
      hasLeaderboard: '',
      leaderboardIdeas: '',
      firstWin: '',
      events: [],
      eventIdeas: '',
      needsHelp: [],
      whatWouldHelp: '',
      hopesToWalkAway: []
    });
  };

  const sendToGoHighLevel = async () => {
    // Send data to Google Apps Script (which writes to Google Sheets)
    const googleSheetData = {
      name: formData.name,
      email: formData.email,
      communityIdea: formData.communityIdea,
      communityTypes: formData.communityTypes,
      communityName: formData.communityName,
      audienceLocations: formData.audienceLocations,
      audienceNotes: formData.audienceNotes,
      launchTimeline: formData.launchTimeline,
      publicPrivate: formData.publicPrivate,
      pricing: formData.pricing,
      pricingDetails: formData.pricingDetails,
      hasBrand: formData.hasBrand,
      hasGraphics: formData.hasGraphics,
      hasLeaderboard: formData.hasLeaderboard,
      leaderboardIdeas: formData.leaderboardIdeas,
      firstWin: formData.firstWin,
      events: formData.events,
      eventIdeas: formData.eventIdeas,
      needsHelp: formData.needsHelp,
      whatWouldHelp: formData.whatWouldHelp,
      hopesToWalkAway: formData.hopesToWalkAway
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbztDY_Da9H1DzT_z352BMv8JW2unRZA9_12BaskkZFCjYkk27UsPEj961B_R-UIxkUSgQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleSheetData)
      });
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    }
  };

  const renderSection0 = () => (
    <div className="section-content">
      <div className="form-group">
        <label className="form-label">Name <span className="required">*</span></label>
        <input
          type="text"
          className="form-input"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email <span className="required">*</span></label>
        <input
          type="email"
          className="form-input"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">What is your community idea?</label>
        <textarea
          className="form-textarea"
          value={formData.communityIdea}
          onChange={(e) => handleChange('communityIdea', e.target.value)}
          placeholder="Tell me the messy version. It does not have to be polished yet. If you have a name for it, drop that here too."
          rows="4"
        />
      </div>

      <div className="form-group">
        <label className="form-label">What kind of community are you thinking about building?</label>
        <div className="checkbox-grid">
          {['Coaching community', 'Course delivery', 'Customer/client support', 'Hobby or interest-based community',
            'Networking/community connection', 'Affiliate or product-based community', 'Other'].map(type => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.communityTypes.includes(type)}
                onChange={() => handleCheckbox('communityTypes', type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection1 = () => (
    <div className="section-content">
      <div className="form-group">
        <label className="form-label">Do you currently have an audience, and where are they hanging out?</label>
        <p style={{fontSize: '0.95rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic'}}>Check all that apply, or let us know if you're starting from scratch.</p>
        <div className="checkbox-grid">
          {['Facebook group', 'Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'Email list',
            'Kajabi', 'Existing client/customer base', 'In-person/local community', "I'm starting from scratch", 'Other'].map(loc => (
            <label key={loc} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.audienceLocations.includes(loc)}
                onChange={() => handleCheckbox('audienceLocations', loc)}
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Anything helpful to know about your current audience?</label>
        <textarea
          className="form-textarea"
          value={formData.audienceNotes}
          onChange={(e) => handleChange('audienceNotes', e.target.value)}
          rows="3"
        />
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="section-content">
      <div className="form-group">
        <label className="form-label">Are you hoping to launch your Skool community within the next 30 days?</label>
        <div className="radio-group">
          {['Yes', 'Probably', 'Next 30-60 days', 'Just in the planning phase now'].map(option => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="launchTimeline"
                value={option}
                checked={formData.launchTimeline === option}
                onChange={(e) => handleChange('launchTimeline', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <div className="info-note">
          <span className="note-icon">💡</span>
          <p>Here's the thing: Your Kitchen Table Strategy Session is free. And if you use my referral link to start your Skool community, you'll get 20% off any future services with me. So if you haven't opened it yet… maybe hold off until after we chat. 😉</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Do you want the community to be public or private?</label>
        <div className="radio-group">
          {['Public', 'Private', "I'm not sure yet"].map(option => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="publicPrivate"
                value={option}
                checked={formData.publicPrivate === option}
                onChange={(e) => handleChange('publicPrivate', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Do you want the community to be free, paid, freemium, or tiered?</label>
        <div className="radio-group">
          {['Free', 'Paid', 'Freemium', 'Tiered', "I'm not sure yet"].map(option => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="pricing"
                value={option}
                checked={formData.pricing === option}
                onChange={(e) => handleChange('pricing', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">If you are thinking about paid, freemium, or tiered access, what do you know so far?</label>
        <textarea
          className="form-textarea"
          value={formData.pricingDetails}
          onChange={(e) => handleChange('pricingDetails', e.target.value)}
          placeholder="Price ideas, levels, what unlocks, what feels fuzzy… drop it here."
          rows="3"
        />
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="section-content">
      <div className="form-group">
        <label className="form-label">Do you already have brand colors, fonts, or a general visual vibe?</label>
        <div className="radio-group">
          {['Yes', 'Kind of', 'Not yet'].map(option => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="hasBrand"
                value={option}
                checked={formData.hasBrand === option}
                onChange={(e) => handleChange('hasBrand', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Do you already have graphics or Canva files started?</label>
        <div className="radio-group">
          {['Yes', 'Kind of', 'Not yet'].map(option => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="hasGraphics"
                value={option}
                checked={formData.hasGraphics === option}
                onChange={(e) => handleChange('hasGraphics', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Do you have a leaderboard theme, level names, or reward ideas?</label>
        <div className="radio-group">
          {['Yes', 'Kind of', 'Not yet'].map(option => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="hasLeaderboard"
                value={option}
                checked={formData.hasLeaderboard === option}
                onChange={(e) => handleChange('hasLeaderboard', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {formData.hasLeaderboard === 'Yes' || formData.hasLeaderboard === 'Kind of' ? (
          <textarea
            className="form-textarea conditional-input"
            value={formData.leaderboardIdeas}
            onChange={(e) => handleChange('leaderboardIdeas', e.target.value)}
            placeholder="What are you thinking?"
            rows="2"
          />
        ) : null}
      </div>
    </div>
  );

  const renderSection4 = () => (
    <div className="section-content">
      <div className="form-group">
        <label className="form-label">What is the first win you want members to have?</label>
        <textarea
          className="form-textarea"
          value={formData.firstWin}
          onChange={(e) => handleChange('firstWin', e.target.value)}
          placeholder="When someone joins, what should they feel, understand, or do first?"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Are you thinking about hosting any calls, challenges, events, workshops, or discussions?</label>
        <div className="checkbox-grid">
          {['Weekly/Monthly calls', 'Office hours', 'Challenges', 'Workshops',
            'Guest speakers', 'Live trainings', "I'm not sure yet", 'None right now'].map(event => (
            <label key={event} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.events.includes(event)}
                onChange={() => handleCheckbox('events', event)}
              />
              <span>{event}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">If you already have an idea for a first challenge, event, or community rhythm, describe it here.</label>
        <textarea
          className="form-textarea"
          value={formData.eventIdeas}
          onChange={(e) => handleChange('eventIdeas', e.target.value)}
          rows="3"
        />
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="section-content">
      <div className="form-group">
        <label className="form-label">Where do you feel like you need the most help right now?</label>
        <div className="checkbox-grid">
          {['Building the actual Skool setup', 'Naming or positioning', 'About page',
            'Community structure', 'Start Here / onboarding', 'Content pillars', 'Posting rhythm',
            'Graphics', 'Offer clarity', 'Tiers or pricing', 'Challenges/events',
            'Member activation', 'Momentum', 'I do not know what I need yet'].map(help => (
            <label key={help} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.needsHelp.includes(help)}
                onChange={() => handleCheckbox('needsHelp', help)}
              />
              <span>{help}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">What would make this feel easier right now?</label>
        <textarea
          className="form-textarea"
          value={formData.whatWouldHelp}
          onChange={(e) => handleChange('whatWouldHelp', e.target.value)}
          placeholder="No need to sound polished. Tell me what feels foggy."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label className="form-label">What do you hope to walk away with after our Kitchen Table Strategy Sesh?</label>
        <div className="checkbox-grid">
          {['A clearer community idea', '2–3 next steps', 'Confidence to start building',
            'Help simplifying the idea', 'Help deciding what to build first',
            'A better sense of whether done-with-you support makes sense', 'Other'].map(hope => (
            <label key={hope} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hopesToWalkAway.includes(hope)}
                onChange={() => handleCheckbox('hopesToWalkAway', hope)}
              />
              <span>{hope}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (currentSection) {
      case 0: return renderSection0();
      case 1: return renderSection1();
      case 2: return renderSection2();
      case 3: return renderSection3();
      case 4: return renderSection4();
      case 5: return renderSection5();
      default: return null;
    }
  };

  if (showSnapshot) {
    return (
      <div className="snapshot-container">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .snapshot-container {
            min-height: 100vh;
            background: linear-gradient(180deg, #14554A 0%, #2B7A6F 50%, #5A9E94 100%);
            padding: 0;
            font-family: 'Lora', serif;
          }

          .snapshot-wrapper {
            max-width: 900px;
            margin: 0 auto;
            background: #FFFDF8;
            border-radius: 0;
            box-shadow: none;
            overflow: hidden;
          }

          .snapshot-header {
            background: linear-gradient(135deg, #1A6B5E 0%, #2B8973 100%);
            padding: 2rem;
            text-align: center;
            border-bottom: none;
          }

          .header-brand {
            color: #F7F1E8;
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            text-transform: uppercase;
          }

          .header-title {
            color: #F7F1E8;
            font-size: 1.3rem;
            font-weight: 400;
            margin-bottom: 0.5rem;
          }

          .snapshot-title {
            font-family: 'Kalam', cursive;
            font-size: 2.2rem;
            color: #F7F1E8;
            margin-bottom: 0;
            font-weight: 700;
            line-height: 1.2;
          }

          .snapshot-body {
            padding: 2.5rem 2rem;
          }

          .completion-celebration {
            text-align: center;
            margin-bottom: 2.5rem;
          }

          .checkmark-icon {
            width: 60px;
            height: 60px;
            background: #5A9E94;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
          }

          .celebration-title {
            font-family: 'Kalam', cursive;
            font-size: 2.2rem;
            color: #14554A;
            margin-bottom: 0.75rem;
            font-weight: 700;
          }

          .celebration-subtitle {
            font-family: 'Kalam', cursive;
            font-size: 1.5rem;
            color: #2B8973;
            margin-bottom: 1rem;
            font-style: italic;
          }

          .celebration-copy {
            font-size: 1rem;
            color: #2B2B2B;
            line-height: 1.7;
            max-width: 600px;
            margin: 0 auto;
          }

          .info-card {
            background: #F7F1E8;
            border-left: 4px solid #5A9E94;
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
          }

          .info-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .info-icon {
            width: 50px;
            height: 50px;
            background: #5A9E94;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            flex-shrink: 0;
          }

          .info-title {
            font-family: 'Kalam', cursive;
            font-size: 1.3rem;
            color: #14554A;
            font-weight: 600;
          }

          .info-row {
            margin-bottom: 1.25rem;
          }

          .info-row:last-child {
            margin-bottom: 0;
          }

          .info-label {
            font-weight: 600;
            color: #1A6B5E;
            margin-bottom: 0.35rem;
            font-size: 0.9rem;
          }

          .info-value {
            color: #2B2B2B;
            line-height: 1.6;
            font-size: 1rem;
          }

          .cta-section {
            background: linear-gradient(135deg, #1A6B5E 0%, #2B8973 100%);
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            margin: 2rem 0;
          }

          .cta-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .cta-title {
            font-family: 'Kalam', cursive;
            font-size: 1.75rem;
            color: #F7F1E8;
            margin-bottom: 0.75rem;
            font-weight: 600;
          }

          .cta-copy {
            color: #F7F1E8;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-size: 1rem;
          }

          .action-btn {
            font-family: 'Lora', serif;
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            margin: 0.5rem;
          }

          .btn-primary {
            background: #E07A7A;
            color: #FFFDF8;
            box-shadow: 0 4px 12px rgba(224, 122, 122, 0.3);
            width: 100%;
            max-width: 500px;
          }

          .btn-primary:hover {
            background: #D86262;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(224, 122, 122, 0.4);
          }

          .btn-secondary {
            background: #E8F3F1;
            color: #1A6B5E;
            border: 2px solid #5A9E94;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.5rem;
            margin: 1rem 0;
            border-radius: 8px;
            font-size: 1.05rem;
            font-weight: 600;
          }

          .btn-secondary:hover {
            background: #D6EAE6;
            border-color: #2B8973;
          }

          .btn-icon {
            font-size: 1.5rem;
          }

          .snapshot-actions {
            display: flex;
            flex-direction: column;
            gap: 0;
            justify-content: center;
            padding: 1.5rem 0;
          }

          .snapshot-reminder {
            background: #F7F1E8;
            border-top: 3px solid #5A9E94;
            border-radius: 0;
            padding: 2rem;
            margin: 2rem 0 0;
            text-align: center;
          }

          .reminder-copy {
            color: #2B2B2B;
            line-height: 1.7;
            font-size: 1rem;
            margin-bottom: 1rem;
          }

          .reminder-accent {
            font-family: 'Kalam', cursive;
            color: #2B8973;
            font-style: italic;
          }

          .closing-message {
            font-family: 'Kalam', cursive;
            font-size: 1.3rem;
            color: #1A6B5E;
            margin: 1.5rem 0 0.5rem;
            font-weight: 500;
          }

          .closing-heart {
            color: #E07A7A;
            font-size: 1.2rem;
          }

          .closing-copy {
            color: #2B2B2B;
            font-size: 0.95rem;
          }

          .snapshot-section {
            margin-bottom: 2rem;
            padding-bottom: 0;
            border-bottom: none;
            display: none;
          }

          @media print {
            .snapshot-actions {
              display: none;
            }

            .snapshot-container {
              background: white;
              padding: 0;
            }

            .snapshot-wrapper {
              box-shadow: none;
              max-width: 100%;
            }

            .snapshot-section {
              display: block;
              margin-bottom: 2rem;
              padding-bottom: 2rem;
              border-bottom: 2px dashed #D9B98F;
            }

            .snapshot-section:last-child {
              border-bottom: none;
            }
          }

          @media (max-width: 768px) {
            .snapshot-title {
              font-size: 1.8rem;
            }

            .celebration-title {
              font-size: 1.8rem;
            }

            .snapshot-body {
              padding: 1.5rem;
            }

            .btn-primary {
              padding: 0.875rem 1.5rem;
            }
          }
        `}</style>

        <div className="snapshot-wrapper">
          <div className="snapshot-header">
            <div className="header-brand">📍 Community Planning Map</div>
            <div className="header-title">Your Community Planning Map Is Complete!</div>
          </div>

          <div className="snapshot-body">
            {/* Celebration Section */}
            <div className="completion-celebration">
              <div className="checkmark-icon">✓</div>
              <h1 className="celebration-title">You did the thing!</h1>
              <p className="celebration-subtitle">Here's your completed Community Planning Map. <span className="closing-heart">♥</span></p>
              <p className="celebration-copy">You've captured the big picture and the important details. Now let's turn this into your next steps.</p>
            </div>

            {/* Information Card */}
            <div className="info-card">
              <div className="info-header">
                <div className="info-icon">👤</div>
                <h2 className="info-title">Your Information</h2>
              </div>
              <div className="info-row">
                <div className="info-label">Name</div>
                <div className="info-value">{formData.name}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Email</div>
                <div className="info-value">{formData.email}</div>
              </div>
            </div>

            {/* Full Map for Printing */}
            {/* Section 1: Your Community Idea */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">✨</span>
                <h2 className="section-title">Your Community Idea</h2>
              </div>
              
              {formData.communityIdea && (
                <div className="answer-group">
                  <span className="answer-label">The Idea:</span>
                  <p className="answer-text">{formData.communityIdea}</p>
                </div>
              )}

              {formData.communityTypes.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Community Type:</span>
                  <ul className="answer-list">
                    {formData.communityTypes.map((type, i) => (
                      <li key={i}>{type}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Section 2: Your Current Audience */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">👥</span>
                <h2 className="section-title">Your Current Audience</h2>
              </div>

              {formData.audienceLocations.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Where They're Hanging Out:</span>
                  <ul className="answer-list">
                    {formData.audienceLocations.map((loc, i) => (
                      <li key={i}>{loc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.audienceNotes && (
                <div className="answer-group">
                  <span className="answer-label">Audience Notes:</span>
                  <p className="answer-text">{formData.audienceNotes}</p>
                </div>
              )}
            </div>

            {/* Section 3: Your Skool Setup */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">🏡</span>
                <h2 className="section-title">Your Skool Setup</h2>
              </div>

              {formData.launchTimeline && (
                <div className="answer-group">
                  <span className="answer-label">Launch Timeline:</span>
                  <p className="answer-text">{formData.launchTimeline}</p>
                </div>
              )}

              {formData.publicPrivate && (
                <div className="answer-group">
                  <span className="answer-label">Public or Private:</span>
                  <p className="answer-text">{formData.publicPrivate}</p>
                </div>
              )}

              {formData.pricing && (
                <div className="answer-group">
                  <span className="answer-label">Pricing Model:</span>
                  <p className="answer-text">{formData.pricing}</p>
                </div>
              )}

              {formData.pricingDetails && (
                <div className="answer-group">
                  <span className="answer-label">Pricing Ideas:</span>
                  <p className="answer-text">{formData.pricingDetails}</p>
                </div>
              )}
            </div>

            {/* Section 4: Your Brand + Build Pieces */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">🎨</span>
                <h2 className="section-title">Your Brand + Build Pieces</h2>
              </div>

              {formData.hasBrand && (
                <div className="answer-group">
                  <span className="answer-label">Brand Status:</span>
                  <p className="answer-text">{formData.hasBrand}</p>
                </div>
              )}

              {formData.hasGraphics && (
                <div className="answer-group">
                  <span className="answer-label">Graphics Status:</span>
                  <p className="answer-text">{formData.hasGraphics}</p>
                </div>
              )}

              {formData.leaderboardIdeas && (
                <div className="answer-group">
                  <span className="answer-label">Leaderboard Ideas:</span>
                  <p className="answer-text">{formData.leaderboardIdeas}</p>
                </div>
              )}
            </div>

            {/* Section 5: Your Member Experience */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">💫</span>
                <h2 className="section-title">Your Member Experience</h2>
              </div>

              {formData.firstWin && (
                <div className="answer-group">
                  <span className="answer-label">First Member Win:</span>
                  <p className="answer-text">{formData.firstWin}</p>
                </div>
              )}

              {formData.events.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Events/Activities:</span>
                  <ul className="answer-list">
                    {formData.events.map((event, i) => (
                      <li key={i}>{event}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.eventIdeas && (
                <div className="answer-group">
                  <span className="answer-label">Event Ideas:</span>
                  <p className="answer-text">{formData.eventIdeas}</p>
                </div>
              )}
            </div>

            {/* Section 6: Where You Want Support */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">🤝</span>
                <h2 className="section-title">Where You Want Support</h2>
              </div>

              {formData.needsHelp.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Need Help With:</span>
                  <ul className="answer-list">
                    {formData.needsHelp.map((help, i) => (
                      <li key={i}>{help}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.whatWouldHelp && (
                <div className="answer-group">
                  <span className="answer-label">What Would Help Right Now:</span>
                  <p className="answer-text">{formData.whatWouldHelp}</p>
                </div>
              )}

              {formData.hopesToWalkAway.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Hopes for Our Session:</span>
                  <ul className="answer-list">
                    {formData.hopesToWalkAway.map((hope, i) => (
                      <li key={i}>{hope}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="cta-section">
              <div className="cta-icon">✨</div>
              <h3 className="cta-title">Ready to talk through your map?</h3>
              <p className="cta-copy">You've got the information. Now let's figure out what matters, what's missing, and what your next step should be.</p>
            </div>

            {/* Action Buttons */}
            <div className="snapshot-actions">
              <a 
                href="https://go.thefaithripple.com/widget/bookings/kitchen-table-session" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn btn-primary"
              >
                📅 Book Your Kitchen Table Strategy Session
              </a>
              
              <button 
                className="action-btn btn-secondary"
                onClick={() => window.print()}
              >
                <span>📥 Print or Save as PDF</span>
                <span className="btn-icon">→</span>
              </button>
              
              <button 
                className="action-btn btn-secondary"
                onClick={startOver}
              >
                <span>🔄 Start Over</span>
                <span className="btn-icon">→</span>
              </button>
            </div>

            {/* Reminder & Closing */}
            <div className="snapshot-reminder">
              <p className="closing-message">You're building something that matters. <span className="closing-heart">♥</span></p>
              <p className="closing-copy">Bring this map to your Kitchen Table Strategy Session. I'm cheering you on.</p>
            </div>
          </div>
        </div>
      </div>
    );
            {/* Section 1: Your Community Idea */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">✨</span>
                <h2 className="section-title">Your Community Idea</h2>
              </div>
              
              {formData.communityIdea && (
                <div className="answer-group">
                  <span className="answer-label">The Idea:</span>
                  <p className="answer-text">{formData.communityIdea}</p>
                </div>
              )}

              {formData.communityTypes.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Community Type:</span>
                  <ul className="answer-list">
                    {formData.communityTypes.map((type, i) => (
                      <li key={i}>{type}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.communityName && (
                <div className="answer-group">
                  <span className="answer-label">Community Name:</span>
                  <p className="answer-text">{formData.communityName}</p>
                </div>
              )}
            </div>

            {/* Section 2: Your Current Audience */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">👥</span>
                <h2 className="section-title">Your Current Audience</h2>
              </div>

              {formData.audienceLocations.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Where They're Hanging Out:</span>
                  <ul className="answer-list">
                    {formData.audienceLocations.map((loc, i) => (
                      <li key={i}>{loc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.audienceNotes && (
                <div className="answer-group">
                  <span className="answer-label">Audience Notes:</span>
                  <p className="answer-text">{formData.audienceNotes}</p>
                </div>
              )}
            </div>

            {/* Section 3: Your Skool Setup */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">🏡</span>
                <h2 className="section-title">Your Skool Setup</h2>
              </div>

              {formData.launchTimeline && (
                <div className="answer-group">
                  <span className="answer-label">Launch Timeline:</span>
                  <p className="answer-text">{formData.launchTimeline}</p>
                </div>
              )}

              {formData.publicPrivate && (
                <div className="answer-group">
                  <span className="answer-label">Public or Private:</span>
                  <p className="answer-text">{formData.publicPrivate}</p>
                </div>
              )}

              {formData.pricing && (
                <div className="answer-group">
                  <span className="answer-label">Pricing Model:</span>
                  <p className="answer-text">{formData.pricing}</p>
                </div>
              )}

              {formData.pricingDetails && (
                <div className="answer-group">
                  <span className="answer-label">Pricing Ideas:</span>
                  <p className="answer-text">{formData.pricingDetails}</p>
                </div>
              )}
            </div>

            {/* Section 4: Your Brand + Build Pieces */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">🎨</span>
                <h2 className="section-title">Your Brand + Build Pieces</h2>
              </div>

              {formData.hasBrand && (
                <div className="answer-group">
                  <span className="answer-label">Brand Assets:</span>
                  <p className="answer-text">{formData.hasBrand}</p>
                </div>
              )}

              {formData.hasGraphics && (
                <div className="answer-group">
                  <span className="answer-label">Graphics Status:</span>
                  <p className="answer-text">{formData.hasGraphics}</p>
                </div>
              )}

              {formData.leaderboardIdeas && (
                <div className="answer-group">
                  <span className="answer-label">Leaderboard Ideas:</span>
                  <p className="answer-text">{formData.leaderboardIdeas}</p>
                </div>
              )}
            </div>

            {/* Section 5: Your Member Experience */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">💫</span>
                <h2 className="section-title">Your Member Experience</h2>
              </div>

              {formData.firstWin && (
                <div className="answer-group">
                  <span className="answer-label">First Member Win:</span>
                  <p className="answer-text">{formData.firstWin}</p>
                </div>
              )}

              {formData.events.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Events & Activities:</span>
                  <ul className="answer-list">
                    {formData.events.map((event, i) => (
                      <li key={i}>{event}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.eventIdeas && (
                <div className="answer-group">
                  <span className="answer-label">Event Ideas:</span>
                  <p className="answer-text">{formData.eventIdeas}</p>
                </div>
              )}
            </div>

            {/* Section 6: Where You Want Support */}
            <div className="snapshot-section">
              <div className="section-header">
                <span className="section-icon">🤝</span>
                <h2 className="section-title">Where You Want Support</h2>
              </div>

              {formData.needsHelp.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Need Help With:</span>
                  <ul className="answer-list">
                    {formData.needsHelp.map((help, i) => (
                      <li key={i}>{help}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.whatWouldHelp && (
                <div className="answer-group">
                  <span className="answer-label">What Would Help Right Now:</span>
                  <p className="answer-text">{formData.whatWouldHelp}</p>
                </div>
              )}

              {formData.hopesToWalkAway.length > 0 && (
                <div className="answer-group">
                  <span className="answer-label">Hopes for Our Session:</span>
                  <ul className="answer-list">
                    {formData.hopesToWalkAway.map((hope, i) => (
                      <li key={i}>{hope}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reminder Section */}
            <div className="snapshot-reminder">
              <h3 className="reminder-title">Bring This to Your Kitchen Table Strategy Sesh</h3>
              <p className="reminder-text">
                Bring this snapshot to our conversation. Here's the bonus: if you use my referral link to open your Skool community, you'll get 20% off this Kitchen Table Strategy Session. Win-win.
              </p>
              <p className="reminder-text">
                <strong>Ready to map the thing?</strong> Book your free 30-minute Kitchen Table Strategy Sesh below.
              </p>
            </div>
          </div>

          <div className="snapshot-actions">
            <button className="action-btn btn-primary" onClick={() => window.print()}>
              Print or Save as PDF
            </button>
            <a 
              href="https://go.thefaithripple.com/widget/bookings/kitchen-table-session" 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn btn-secondary"
            >
              Book Your Kitchen Table Strategy Sesh
            </a>
            <button className="action-btn btn-tertiary" onClick={startOver}>
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Lora', serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #14285C 0%, #206B21 100%);
          padding: 2rem 1rem;
        }

        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-section {
          background: linear-gradient(135deg, #F7F1E8 0%, #FFFDF8 100%);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '♥';
          position: absolute;
          top: -10px;
          right: 20px;
          font-size: 4rem;
          color: #C87979;
          opacity: 0.15;
          transform: rotate(-15deg);
        }

        .hero-section::after {
          content: '✨';
          position: absolute;
          bottom: 10px;
          left: 30px;
          font-size: 3rem;
          opacity: 0.15;
        }

        .brand-title {
          font-family: 'Kalam', cursive;
          font-size: 1.2rem;
          color: #206B21;
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .hero-title {
          font-family: 'Kalam', cursive;
          font-size: 3rem;
          color: #14285C;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          font-weight: 700;
          position: relative;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: #2B2B2B;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .hero-cta {
          font-family: 'Kalam', cursive;
          font-size: 1.3rem;
          color: #C89B3C;
          font-weight: 600;
          margin-top: 1.5rem;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .progress-step {
          flex: 1;
          text-align: center;
          padding: 0.75rem 0.5rem;
          border-radius: 12px;
          background: #F7F1E8;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .progress-step.active {
          background: linear-gradient(135deg, #206B21 0%, #14285C 100%);
          color: #FFFDF8;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(32, 107, 33, 0.3);
        }

        .progress-step.completed {
          background: #D9B98F;
          color: #2B2B2B;
        }

        .step-icon {
          font-size: 1.25rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .step-title {
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .form-card {
          background: #FFFDF8;
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.4s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-header-form {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid #D9B98F;
        }

        .section-title-form {
          font-family: 'Kalam', cursive;
          font-size: 2rem;
          color: #14285C;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
        }

        .section-content {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-label {
          display: block;
          font-size: 1.05rem;
          font-weight: 600;
          color: #206B21;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .required {
          color: #C87979;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.875rem 1.125rem;
          border: 2px solid #D9B98F;
          border-radius: 12px;
          font-family: 'Lora', serif;
          font-size: 1rem;
          color: #2B2B2B;
          background: #FFFDF8;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #206B21;
          box-shadow: 0 0 0 3px rgba(32, 107, 33, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #999;
          font-style: italic;
        }

        .conditional-input {
          margin-top: 1rem;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .radio-group,
        .checkbox-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.75rem;
        }

        .radio-label,
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.125rem;
          background: #F7F1E8;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          color: #2B2B2B;
        }

        .radio-label:hover,
        .checkbox-label:hover {
          background: #FFFDF8;
          border-color: #D9B98F;
        }

        .radio-label input:checked ~ span,
        .checkbox-label input:checked ~ span {
          font-weight: 600;
          color: #206B21;
        }

        .radio-label input,
        .checkbox-label input {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #206B21;
        }

        .info-note {
          background: linear-gradient(135deg, #FFF9E6 0%, #FFFDF8 100%);
          border-left: 4px solid #C89B3C;
          border-radius: 8px;
          padding: 1.25rem;
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .note-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .info-note p {
          margin: 0;
          color: #2B2B2B;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;
        }

        .nav-btn {
          font-family: 'Lora', serif;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          max-width: 200px;
        }

        .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .btn-prev {
          background: transparent;
          color: #14285C;
          border: 2px solid #14285C;
        }

        .btn-prev:hover:not(:disabled) {
          background: #14285C;
          color: #FFFDF8;
        }

        .btn-next {
          background: #206B21;
          color: #FFFDF8;
          box-shadow: 0 4px 12px rgba(32, 107, 33, 0.3);
        }

        .btn-next:hover:not(:disabled) {
          background: #14285C;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(20, 40, 92, 0.4);
        }

        .btn-generate {
          background: linear-gradient(135deg, #C89B3C 0%, #D9B98F 100%);
          color: #2B2B2B;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(200, 155, 60, 0.4);
        }

        .btn-generate:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(200, 155, 60, 0.5);
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 1rem 0.5rem;
          }

          .hero-section {
            padding: 2rem 1.5rem;
            border-radius: 16px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .form-card {
            padding: 1.5rem;
            border-radius: 16px;
          }

          .section-title-form {
            font-size: 1.5rem;
          }

          .progress-steps {
            flex-wrap: wrap;
          }

          .progress-step {
            flex: 1 0 30%;
          }

          .step-title {
            font-size: 0.65rem;
          }

          .checkbox-grid {
            grid-template-columns: 1fr;
          }

          .form-navigation {
            flex-direction: column;
          }

          .nav-btn {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="content-wrapper">
        <div className="hero-section">
          <div className="brand-title">Your Skool Building Bestie</div>
          <h1 className="hero-title">Thinking about building a Skool community?</h1>
          <div className="hero-subtitle">
            Before you start clicking buttons, opening doors, and building yourself into confusion… 
            let's get a few things out of your head and onto the table.
            <br /><br />
            This Community Planning Snapshot will help you gather the basics of what you already 
            know about your community idea so we can use our Kitchen Table Strategy Sesh for the 
            good stuff: clarity, next steps, and what actually needs to happen next.
          </div>
          <div className="hero-cta">Bring a bevy. Let's map the thing.</div>
        </div>

        <div className="progress-bar">
          <div className="progress-steps">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`progress-step ${
                  currentSection === section.id ? 'active' : 
                  currentSection > section.id ? 'completed' : ''
                }`}
                onClick={() => setCurrentSection(section.id)}
              >
                <span className="step-icon">{section.icon}</span>
                <span className="step-title">{section.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-card">
          <div className="section-header-form">
            <h2 className="section-title-form">
              <span>{sections[currentSection].icon}</span>
              {sections[currentSection].title}
            </h2>
          </div>

          {renderSectionContent()}

          <div className="form-navigation">
            <button
              className="nav-btn btn-prev"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              ← Previous
            </button>
            {currentSection < sections.length - 1 ? (
              <button className="nav-btn btn-next" onClick={nextSection}>
                Next →
              </button>
            ) : (
              <button className="nav-btn btn-generate" onClick={generateSnapshot}>
                Generate My Snapshot ✨
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySnapshot;
