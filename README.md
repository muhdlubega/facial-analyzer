# Facial Recognition Analysis App

A Next.js facial recognition application powered by Mistral AI's Pixtral vision model that analyzes faces to predict ancestry origins and emotional expressions with accuracy percentages.

## Features

- **Template Face Selection**: Browse through a horizontal scrolling carousel of sample faces to see instant analysis
- **Image Upload**: Upload your own photos for personalized facial analysis
- **Webcam Capture**: Take a photo directly using your device's webcam for real-time analysis
- **AI-Powered Analysis**: Leverages Mistral AI's Pixtral-12B model for accurate predictions
- **Ancestry Predictions**: Get detailed ancestry origin predictions with confidence percentages
- **Emotion Detection**: Analyze facial expressions to detect emotions with accuracy scores
- **Modern UI**: Clean, responsive interface built with shadcn/ui components
- **Optimized Performance**: Uses Next.js Image optimization and efficient blob URL handling

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **AI Model**: Mistral AI Pixtral-12B-2409
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Mistral AI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Mistral AI API key:
   ```
   MISTRAL_API_KEY=your_mistral_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Choose Your Method**:
   - Select a template face from the carousel
   - Upload your own image using the "Upload Image" button
   - Take a photo using the "Take a Photo" button to capture via webcam

2. **Analysis**:
   - The app will process your image using Mistral AI's Pixtral model
   - Wait for the AI to analyze facial features

3. **View Results**:
   - See ancestry predictions with confidence percentages
   - View detected emotions with accuracy scores
   - Each prediction includes a visual progress indicator

## Project Structure

```
├── app/
│   ├── api/
│   │   └── analyze-face/     # API route for Mistral AI integration
│   ├── analyze/               # Analysis results page
│   └── page.tsx               # Homepage with carousel
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── face-carousel.tsx      # Template face carousel
│   ├── upload-section.tsx     # Image upload and webcam trigger
│   ├── webcam-capture.tsx     # Webcam capture dialog
│   └── analysis-results.tsx   # Results display component
└── public/                    # Static assets and template images
```

## API Integration

The app uses the Mistral AI SDK to interact with the Pixtral-12B model:

- **Endpoint**: `/api/analyze-face`
- **Method**: POST
- **Input**: Base64 encoded image
- **Output**: JSON with ancestry and emotion predictions

## Features in Detail

### Webcam Capture
- Real-time video preview
- Capture button to take a snapshot
- Retake functionality
- Automatic cleanup of media streams

### Image Processing
- Efficient blob URL handling to avoid storage quota issues
- Automatic image optimization with Next.js
- Support for various image formats (JPEG, PNG, WebP)

### Analysis Results
- Visual progress bars for each prediction
- Color-coded confidence levels
- Responsive layout for mobile and desktop
- Loading states with skeleton UI

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (requires HTTPS for webcam)
- Mobile browsers: Full support with responsive design

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Powered by [Mistral AI](https://mistral.ai/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/)
