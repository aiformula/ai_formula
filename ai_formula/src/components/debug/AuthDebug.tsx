/**
 * Auth Debug Component
 * @fileoverview Debug component to help diagnose authentication redirect issues
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabaseConfig } from '@/lib/supabase';

const AuthDebug: React.FC = () => {
  const currentUrl = window.location.href;
  const currentHost = window.location.hostname;
  const currentPort = window.location.port;
  const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

  return (
    <Card className="bg-gray-800 border-gray-700 text-white max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          🔍 Authentication Debug Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Environment */}
        <div>
          <h3 className="font-semibold text-white mb-2">Current Environment</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Current URL:</span>
              <span className="text-white font-mono text-xs">{currentUrl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hostname:</span>
              <Badge className={currentHost === 'localhost' ? 'bg-green-600' : 'bg-red-600'}>
                {currentHost}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Port:</span>
              <span className="text-white">{currentPort || 'default'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Development Mode:</span>
              <Badge className={isDev ? 'bg-green-600' : 'bg-blue-600'}>
                {isDev ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Supabase Configuration */}
        <div>
          <h3 className="font-semibold text-white mb-2">Supabase Configuration</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Configured:</span>
              <Badge className={supabaseConfig.configured ? 'bg-green-600' : 'bg-red-600'}>
                {supabaseConfig.configured ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Using Fallback:</span>
              <Badge className={supabaseConfig.usingFallback ? 'bg-yellow-600' : 'bg-green-600'}>
                {supabaseConfig.usingFallback ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Supabase URL:</span>
              <span className="text-white font-mono text-xs">
                {supabaseConfig.url ? `${supabaseConfig.url.substring(0, 30)}...` : 'Not set'}
              </span>
            </div>
          </div>
        </div>

        {/* Expected Redirect URLs */}
        <div>
          <h3 className="font-semibold text-white mb-2">Expected Redirect URLs</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Development:</span>
              <span className="text-white font-mono text-xs">
                http://localhost:{currentPort || '8081'}/auth
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Production:</span>
              <span className="text-white font-mono text-xs">
                https://aiformula.net/auth
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-400 mb-2">🛠️ Fix Instructions</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p><strong>1. Check Supabase Dashboard:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Go to Authentication → Settings → Site URL</li>
              <li>Add: <code className="bg-gray-700 px-1 rounded">http://localhost:{currentPort || '8081'}</code></li>
              <li>Go to Authentication → Settings → Redirect URLs</li>
              <li>Add: <code className="bg-gray-700 px-1 rounded">http://localhost:{currentPort || '8081'}/auth</code></li>
            </ul>
            
            <p className="mt-4"><strong>2. Environment Variables:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Make sure VITE_SUPABASE_URL points to your project</li>
              <li>Make sure VITE_SUPABASE_ANON_KEY is correct</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthDebug; 