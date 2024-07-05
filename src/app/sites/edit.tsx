"use client"

import {useEffect, useState} from "react"
import DOMPurify from "dompurify"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs"
import "react-tabs/style/react-tabs.css"

interface EditableElement {
  id: string
  type: string
  defaultValue: string
}

interface EditableCSSProperty {
  selector: string
  property: string
  value: string
}

interface JournalTemplate {
  htmlContent: string
  cssContent: string
}

export default function Home() {
  const [journalTemplate, setJournalTemplate] =
    useState<JournalTemplate | null>(null)
  const [editableElements, setEditableElements] = useState<EditableElement[]>(
    []
  )
  const [editableCSSProperties, setEditableCSSProperties] = useState<
    EditableCSSProperty[]
  >([])
  const [customizations, setCustomizations] = useState<Record<string, string>>(
    {}
  )
  const [renderedTemplate, setRenderedTemplate] = useState<string>("")
  const [debug, setDebug] = useState<string>("")

  useEffect(() => {
    fetch("/template.html")
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")

        // Extraction des éléments éditables
        const editables: EditableElement[] = []
        const elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6, p, img")
        elements.forEach((el) => {
          const id = `editable-${Math.random().toString(36).substr(2, 9)}`
          let type = ""
          let defaultValue = ""

          if (el.tagName === "IMG") {
            type = "image"
            defaultValue = (el as HTMLImageElement).src
          } else if (
            ["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(el.tagName)
          ) {
            type = "text"
            defaultValue = el.textContent?.trim() || ""
          }

          if (type !== "") {
            el.setAttribute("data-editable", type)
            el.id = id
            editables.push({id, type, defaultValue})
          }
        })

        // Extraction des règles CSS pertinentes
        const cssRules: EditableCSSProperty[] = []
        const styleElements = doc.getElementsByTagName("style")
        let debugInfo = "Style elements found: " + styleElements.length + "\n"

        Array.from(styleElements).forEach((styleElement, index) => {
          debugInfo += `Processing style element ${index + 1}:\n`
          const cssText = styleElement.textContent || ""
          debugInfo += `CSS content: ${cssText}\n`

          const cssRuleRegex = /([^\s,{]+)\s*{([^}]*)}/g
          let match

          while ((match = cssRuleRegex.exec(cssText)) !== null) {
            const selector = match[1].trim()
            const styles = match[2].trim()
            debugInfo += `Matched selector: ${selector}\n`

            const styleRegex =
              /(color|background-color|font-size)\s*:\s*([^;]+)/g
            let styleMatch

            while ((styleMatch = styleRegex.exec(styles)) !== null) {
              const property = styleMatch[1]
              const value = styleMatch[2].trim()
              debugInfo += `Matched property: ${property}, value: ${value}\n`

              cssRules.push({selector, property, value})
            }
          }
        })

        debugInfo += `Total CSS rules extracted: ${cssRules.length}\n`
        setDebug(debugInfo)

        const initialCustomizations: Record<string, string> = {}
        editables.forEach((el) => {
          initialCustomizations[el.id] = el.defaultValue
        })
        cssRules.forEach((rule) => {
          initialCustomizations[`${rule.selector}|${rule.property}`] =
            rule.value
        })

        setEditableElements(editables)
        setEditableCSSProperties(cssRules)
        setCustomizations(initialCustomizations)
        setJournalTemplate({
          htmlContent: doc.body.innerHTML,
          cssContent: Array.from(doc.querySelectorAll("style"))
            .map((style) => style.textContent || "")
            .join("\n"),
        })
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du template:", error)
        setDebug(`Error loading template: ${error.message}`)
      })
  }, [])

  const updateCustomization = (id: string, value: string) => {
    setCustomizations((prev) => ({...prev, [id]: value}))
  }

  const updateTemplate = () => {
    if (!journalTemplate) return ""

    let updatedTemplate = journalTemplate.htmlContent
    editableElements.forEach((el) => {
      const value = customizations[el.id]
      if (el.type === "text") {
        updatedTemplate = updatedTemplate.replace(
          new RegExp(`<([^>]+id="${el.id}"[^>]*)>(.*?)<\/`, "g"),
          `<$1>${DOMPurify.sanitize(value)}<\/`
        )
      } else if (el.type === "image") {
        updatedTemplate = updatedTemplate.replace(
          new RegExp(`<img([^>]+)id="${el.id}"([^>]+)src="[^"]*"`, "g"),
          `<img$1id="${el.id}"$2src="${DOMPurify.sanitize(value)}"`
        )
      }
    })

    let updatedCSS = journalTemplate.cssContent
    editableCSSProperties.forEach((prop) => {
      const id = `${prop.selector}|${prop.property}`
      const value = customizations[id]
      const regex = new RegExp(
        `(${prop.selector}\\s*{[^}]*?)(${prop.property}\\s*:\\s*[^;]+)(;?)([^}]*})`,
        "g"
      )
      updatedCSS = updatedCSS.replace(
        regex,
        `$1${prop.property}: ${DOMPurify.sanitize(value)}$3$4`
      )
    })

    return `${updatedTemplate}<style>${updatedCSS}</style>`
  }

  useEffect(() => {
    const updatedTemplate = updateTemplate()
    setRenderedTemplate(updatedTemplate)
  }, [customizations, journalTemplate])

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <Tabs>
          <TabList>
            <Tab>Contenu</Tab>
            <Tab>Styles</Tab>
            <Tab>Debug</Tab>
          </TabList>

          <TabPanel>
            <h2 className="text-xl font-bold mb-4">
              Options de personnalisation du contenu
            </h2>
            {editableElements.length === 0 ? (
              <p>Aucun élément personnalisable détecté.</p>
            ) : (
              <>
                {editableElements.map((el) => (
                  <div key={el.id} className="mb-4">
                    <label className="block mb-1">{el.id}</label>
                    <input
                      type="text"
                      value={customizations[el.id] || ""}
                      onChange={(e) =>
                        updateCustomization(el.id, e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                ))}
              </>
            )}
          </TabPanel>

          <TabPanel>
            <h2 className="text-xl font-bold mb-4">
              Options de personnalisation des styles
            </h2>
            {editableCSSProperties.length === 0 ? (
              <p>Aucune propriété CSS modifiable détectée.</p>
            ) : (
              <>
                {editableCSSProperties.map((prop, index) => (
                  <div key={index} className="mb-4">
                    <label className="block mb-1">{`${prop.selector} { ${prop.property}: ${prop.value} }`}</label>
                    <input
                      type="text"
                      value={
                        customizations[`${prop.selector}|${prop.property}`] ||
                        ""
                      }
                      onChange={(e) =>
                        updateCustomization(
                          `${prop.selector}|${prop.property}`,
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                ))}
              </>
            )}
          </TabPanel>

          <TabPanel>
            <h2 className="text-xl font-bold mb-4">Informations de débogage</h2>
            <pre className="whitespace-pre-wrap">{debug}</pre>
          </TabPanel>
        </Tabs>
      </div>
      <div
        className="w-3/4 p-4 overflow-y-auto"
        dangerouslySetInnerHTML={{__html: renderedTemplate}}
      />
    </div>
  )
}
