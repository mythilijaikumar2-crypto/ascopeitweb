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

// Job Application Form Payload — resume sent as multipart file (no resumeFileId)
export interface CareerPayload {
  jobId: string
  jobTitle: string
  fullName: string
  email: string
  phone: string
  github?: string
  notes?: string
  resume: File
}

// Candidate Update Payload
export interface CareerUpdatePayload {
  jobTitle?: string
  fullName?: string
  email?: string
  phone?: string
  github?: string
  notes?: string
  status?: string
  resume?: File
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

// ─── Candidate metadata type (no binary) ─────────────────────────────────────
export interface CandidateMeta {
  id: string
  jobId: string
  jobTitle: string
  fullName: string
  email: string
  phone: string
  github?: string
  notes?: string
  resumeName: string
  resumeType: string
  resumeSize: number
  uploadedAt: string
  status: string
  createdAt: string
  updatedAt: string
}

/**
 * Handles API submissions.
 */
export const api = {
  /**
   * Submit a job application with resume in a single multipart request.
   * Resume is sent as a file field named "resume".
   */
  async submitCareerApplication(
    payload: CareerPayload
  ): Promise<{ success: boolean; message: string; data?: CandidateMeta }> {
    try {
      const formData = new FormData()
      formData.append('jobId', payload.jobId)
      formData.append('jobTitle', payload.jobTitle)
      formData.append('fullName', payload.fullName)
      formData.append('email', payload.email)
      formData.append('phone', payload.phone)
      if (payload.github) formData.append('github', payload.github)
      if (payload.notes) formData.append('notes', payload.notes)
      formData.append('resume', payload.resume)

      const response = await fetch(`${API_BASE_URL}/careers/apply`, {
        method: 'POST',
        body: formData
        // Note: Do NOT set Content-Type — browser sets it with boundary automatically
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || `Server returned HTTP status ${response.status}`)
      }

      return data
    } catch (error: any) {
      console.error('API Error: submitCareerApplication failed', error)
      return { success: false, message: error.message || 'Application submission failed' }
    }
  },

  /**
   * Get all career candidates (metadata only, no resume binary).
   * Requires auth token.
   */
  async getCandidates(
    token: string,
    limit = 20,
    offset = 0
  ): Promise<{ success: boolean; data?: CandidateMeta[]; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/list?limit=${limit}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || `HTTP ${response.status}`)
      return data
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to fetch candidates' }
    }
  },

  /**
   * Get single candidate metadata by ID.
   * Requires auth token.
   */
  async getCandidate(
    token: string,
    id: string
  ): Promise<{ success: boolean; data?: CandidateMeta; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || `HTTP ${response.status}`)
      return data
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to fetch candidate' }
    }
  },

  /**
   * Update candidate info and optionally replace resume.
   * Requires auth token.
   */
  async updateCandidate(
    token: string,
    id: string,
    payload: CareerUpdatePayload
  ): Promise<{ success: boolean; message: string; data?: CandidateMeta }> {
    try {
      const formData = new FormData()
      if (payload.jobTitle) formData.append('jobTitle', payload.jobTitle)
      if (payload.fullName) formData.append('fullName', payload.fullName)
      if (payload.email) formData.append('email', payload.email)
      if (payload.phone) formData.append('phone', payload.phone)
      if (payload.github !== undefined) formData.append('github', payload.github)
      if (payload.notes !== undefined) formData.append('notes', payload.notes)
      if (payload.status) formData.append('status', payload.status)
      if (payload.resume) formData.append('resume', payload.resume)

      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || `HTTP ${response.status}`)
      return data
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to update candidate' }
    }
  },

  /**
   * Delete a candidate and their resume from the database.
   * Requires auth token.
   */
  async deleteCandidate(
    token: string,
    id: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || `HTTP ${response.status}`)
      return data
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to delete candidate' }
    }
  },

  /**
   * Get the resume stream URL for a candidate.
   * ?download=true  → triggers browser download with original filename
   * ?download=false → opens resume inline in browser tab (preview)
   */
  getResumeUrl(id: string, download = false): string {
    return `${API_BASE_URL}/careers/${id}/resume?download=${download}`
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
