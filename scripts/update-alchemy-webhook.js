#!/usr/bin/env node

/**
 * Script to update Alchemy webhook URL
 * This updates the existing webhook to use the ngrok tunnel URL
 */

import fetch from 'node-fetch';

const ALCHEMY_AUTH_TOKEN = 'MeUyrthPQP8PI6SHT4lwtp_OHpbqbhFy';
const WEBHOOK_ID = 'wh_yxg2izkjty3odk2g';
const NGROK_URL = 'https://020b7a5bb6c6.ngrok-free.app';

async function updateWebhook() {
  try {
    console.log('🔄 Updating Alchemy webhook...');

    // Update webhook URL
    const updateUrl = `https://dashboard.alchemy.com/api/update-webhook`;

    const response = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Alchemy-Token': ALCHEMY_AUTH_TOKEN
      },
      body: JSON.stringify({
        webhook_id: WEBHOOK_ID,
        webhook_url: `${NGROK_URL}/webhooks/alchemy`,
        is_active: true
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to update webhook:', error);

      // Try alternative approach - recreate webhook
      console.log('🔄 Attempting to create new webhook...');
      await createWebhook();
    } else {
      const result = await response.json();
      console.log('✅ Webhook updated successfully:', result);
    }

    // List current webhook details
    await getWebhookDetails();

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function createWebhook() {
  try {
    const createUrl = `https://dashboard.alchemy.com/api/create-webhook`;

    const response = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Alchemy-Token': ALCHEMY_AUTH_TOKEN
      },
      body: JSON.stringify({
        app_id: 'w19n9qvx2pr6u01x',
        webhook_type: 'ADDRESS_ACTIVITY',
        webhook_url: `${NGROK_URL}/webhooks/alchemy`,
        addresses: []
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to create webhook:', error);
    } else {
      const result = await response.json();
      console.log('✅ New webhook created:', result);
    }
  } catch (error) {
    console.error('❌ Error creating webhook:', error);
  }
}

async function getWebhookDetails() {
  try {
    console.log('\n📋 Getting webhook details...');

    const url = `https://dashboard.alchemy.com/api/webhooks`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Alchemy-Token': ALCHEMY_AUTH_TOKEN
      }
    });

    if (response.ok) {
      const webhooks = await response.json();
      console.log('📋 Current webhooks:', JSON.stringify(webhooks, null, 2));
    } else {
      console.log('Could not fetch webhook details');
    }
  } catch (error) {
    console.error('Error fetching webhook details:', error);
  }
}

// Run the update
updateWebhook();