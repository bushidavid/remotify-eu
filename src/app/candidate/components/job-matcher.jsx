'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function JobMatcher() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [matches, setMatches] = useState([]);

    const handleMatch = async () => {
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);

        try {
            const response = await fetch('/api/resume-upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log("resume data", data);

            const matchResponse = await fetch('/api/match', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeEmbedding: data.embedding }),
            });

            const matchData = await matchResponse.json();

            console.log("matches: ", matchData);

            setMatches(matchData.matches);
        } catch (error) {
            console.error('Error matching jobs:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={handleMatch} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload and Find Matches'}
          </Button>

          {uploading && <progress value={50} max={100}>Processing...</progress>}

          {matches.length > 0 && (
            <ul>
              {matches.map((match) => (
                <li key={match.id}>Job ID: {match.id} - Match Score: {match.score}%</li>
              ))}
            </ul>
          )}
        </div>
    );
}