/**
 * Ascope Tech API Client
 * Handles end-to-end integration between frontend forms and the Node/Express backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// Generic Scoping Project Form Payload
export interface ContactPayload {
  fullName: string
  company: string
  email: string
  scope: string
  budget: string
  brief: string
  servicesNeeded?: string[]
}

// Job Application Form Payload — uses resumeFileId after upload step
export interface CareerPayload {
  jobId: string
  jobTitle: string
  fullName: string
  email: string
  phone: string
  github?: string
  notes?: string
  resumeFileId: string
}

// Internship Application Form Payload — uses resumeFileId after upload step
export interface InternshipPayload {
  trackId: string
  trackTitle: string
  name: string
  email: string
  phone: string
  github?: string
  notes?: string
  resumeFileId: string
}

// Training Enrollment Form Payload
export interface TrainingPayload {
  name: string
  email: string
  phone: string
  course: string
  experience: string
}

/**
 * Handles API submissions.
 */
export const api = {
  /**
   * Step 1: Upload a resume file — returns { fileId, originalName, mimeType, size }
   * This must be called BEFORE submitting a career or internship application.
   */
  async uploadFile(file: File): Promise<{ success: boolean; fileId?: string; message?: string }> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
        // Note: Do NOT set Content-Type header — browser sets it automatically with boundary
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || `Server returned HTTP status ${response.status}`)
      }

      return { success: true, fileId: data.data?.fileId }
    } catch (error: any) {
      console.error('API Error: uploadFile failed', error)
      return { success: false, message: error.message || 'File upload failed' }
    }
  },

  /**
   * Submit Contact Scoping Enquiry
   */
  async submitContact(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || `Server returned HTTP status ${response.status}`)
      }

      return await response.json()
    } catch (error: any) {
      console.error('API Error: submitContact failed', error)
      return { success: false, message: error.message || 'API request failed' }
    }
  },

  /**
   * Submit Careers Job Application — requires resumeFileId from uploadFile() first
   */
  async submitCareerApplication(payload: CareerPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || `Server returned HTTP status ${response.status}`)
      }

      return data
    } catch (error: any) {
      console.error('API Error: submitCareerApplication failed', error)
      return { success: false, message: error.message || 'API request failed' }
    }
  },

  /**
   * Submit Internship application — requires resumeFileId from uploadFile() first
   */
  async submitInternshipApplication(payload: InternshipPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/internship/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || `Server returned HTTP status ${response.status}`)
      }

      return data
    } catch (error: any) {
      console.error('API Error: submitInternshipApplication failed', error)
      return { success: false, message: error.message || 'API request failed' }
    }
  },

  /**
   * Submit Training Bootcamp Enrollment
   */
  async submitTrainingEnrollment(payload: TrainingPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/training/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || `Server returned HTTP status ${response.status}`)
      }

      return data
    } catch (error: any) {
      console.error('API Error: submitTrainingEnrollment failed', error)
      return { success: false, message: error.message || 'API request failed' }
    }
  }
}
