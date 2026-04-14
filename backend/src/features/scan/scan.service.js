import axios from 'axios'

/**
 * Service to interact with OpenRouter API for meal analysis
 */
export const analyzeMealImage = async (base64Image) => {
  const apiKey = process.env.OPEN_ROUTER_KEP // Using the key name as found in .env
  const model = 'google/gemini-2.5-flash-preview' // Gemini 2.5 Flash

  const prompt = `
    Analyze this meal image and return a JSON object with the following structure:
    {
      "mealName": "Name of the meal",
      "items": [
        { "name": "Item name", "calories": 100, "protein": 10, "carbs": 20, "fats": 5, "icon": "material-icon-name" }
      ],
      "totalMacros": { "calories": 500, "protein": 30, "carbs": 60, "fats": 20 },
      "forecast": "One of: crash, balanced, sluggish",
      "clinicalInsight": "A short, helpful clinical insight based on the meal composition."
    }
    Be accurate with calorie and macro estimations.
  `

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://nutrilens.ai', // Optional
          'X-Title': 'NutriLens', // Optional
          'Content-Type': 'application/json'
        }
      }
    )

    const content = response.data.choices[0].message.content
    return JSON.parse(content)
  } catch (error) {
    console.error('OpenRouter API Error:', error?.response?.data || error.message)
    throw new Error('Failed to analyze meal image.')
  }
}
