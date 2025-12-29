# Interview Transcript

**Content Type:** Technical/Tutorial - Blog posts about coding, debugging, technical implementations

**Date:** 2025-12-29

---

## Q: What is the high-level goal of this technical blog post?

**A:** The goal is to teach people how to build their first M365 Copilot agent using TypeSpec for Microsoft 365 Copilot. A very simple one using only the websearch capability.

---

## Q: What prompted you to create this tutorial?

**A:** I was helping a developer get started and thought I should share it. Documentation exists and is good, but I wanted to share a more personal experience.

---

## Q: What was the developer's background when you helped them?

**A:** The developer was completely new to M365 Copilot and M365 dev. They were a regular TypeScript full stack dev that wanted to build agents for M365 Copilot.

---

## Q: What was the first challenge or confusion this developer encountered when trying to build their first agent?

**A:** The developer's first challenges were:
- How to get started?
- What's the best approach?
- Why is there no "real" code when building declarative agents?

---

## Q: How did you explain to them what a declarative agent is and why there's no "real" code involved?

**A:** I showed them the stack diagram used in conferences. It was helpful. I explained that it's mainly configuration of M365 Copilot to benefit from the power of the platform vs building your own end-to-end platform with orchestrators, models, function calling, RAI, etc.

**Visual Artifact:** Stack diagram showing the declarative agent architecture
- URL: https://devblogs.microsoft.com/microsoft365dev/wp-content/uploads/sites/73/2025/11/DeclarativeAgents.webp

---

## Q: After explaining the declarative approach, what was the first practical step you walked them through?

**A:** The first practical step was: setup VS Code with the M365 Agents Toolkit and create a new DA with TypeSpec.

---

## Q: What exactly did they need to install or configure in VS Code?

**A:** They needed:
- A tenant with M365 Copilot licenses
- Node 20

---

## Q: Once they had VS Code and the M365 Agents Toolkit installed, what were the exact steps to create the new declarative agent with TypeSpec?

**A:** The steps were:
1. Create a new declarative agent
2. Select Start with TypeSpec
3. Select the target folder and there you go!

There is a button directly in the extension that allows them. There is also a command palette option.

---

## Q: What did the generated project structure look like?

**A:** The generated project had all the necessary files, the main manifest, the TypeSpec files that represent the agent config.

---

## Q: Can you share what the initial TypeSpec file looked like before making any changes?

**A:** Some of the TypeSpec examples are here: https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents-typespec

---

## Q: What specific changes did you guide them to make in the TypeSpec file to add the websearch capability?

**A:** The specific change was adding the WebSearch capability in their agent namespace.

**Reference:** https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents-typespec#add-web-content

---

## Q: After adding the WebSearch capability to the TypeSpec file, what was the next step?

**A:** After adding the WebSearch capability, they needed to:
1. Run `npm install` first
2. Then `npm run compile`
3. Then provision the agent to M365 Copilot
4. Test manually directly in the tool

---

## Q: What happened during the provision step?

**A:** They used the Provision button in the toolkit's UX. It was provisioned to their M365 tenant because they logged in.

---

## Q: When they first tested the agent in M365 Copilot, what did they ask it to do, and what happened?

**A:** They did a first search asking "what is the best way to add issues to Github projects" and it worked the first time! I advised them to type "-developer on" to enable the debugging capabilities to see which capabilities are executed. It's just a simple but effective best practice when building agents.

---

## Q: What did the developer see when they enabled the debugging with "-developer on"?

**A:** They saw what we call the debugger card, with all debugging info:
- Agent ID
- Version
- Some debugging IDs
- Enabled capabilities
- Executed capabilities
- etc.

---

## Q: After this successful test, did you show them how to customize the agent further?

**A:** They went and improved the instructions to make it more personalized. They modified the instructions.tsp file. They also made the agent name and description more descriptive related to the need of that person.

---

## Q: Can you share an example of what instructions they added, or what they changed the name and description to?

**A:** They added:
- How to style the response
- Added tone and guidance
- Also added some examples of conversations to help

---

## Q: After making those customizations to the instructions, did they need to recompile and re-provision the agent, or was there a faster iteration cycle?

**A:** They needed to re-provision the agent and the compilation is taken care of by the provisioning process.

---

## Q: When they tested the updated agent with the new instructions, how did the responses differ from the initial version?

**A:** Yes! First time! This was the wow moment.

---

## Q: After successfully building and customizing their first agent, what was the developer's main takeaway or reaction?

**A:** The developer's main takeaway was how simple yet powerful this was - with very very little code and configuration they were able to achieve their exact goal.

---

## Q: What did you tell them about next steps or what they could explore beyond websearch?

**A:** They discussed how they could publish directly to their admins for approval for making it available widely.

---

## Q: How does that admin approval and publishing process work?

**A:** Sending the request is built into the toolkit. The admin accesses the request through the Microsoft Admin Center. They didn't go through it, but the developer was happy to know it existed.

---

## Q: Looking back at this whole experience, were there any stumbling blocks, error messages, or confusing moments that you had to help them troubleshoot?

**A:** Creating the new project is sometimes confusing as you need to open the sidebar of the toolkit, whereas other project types (.NET for instance) are in the explorer by default.

---

## Q: Are there any other gotchas, tips, or best practices you'd want to share with someone following this tutorial?

**A:** Using the command palette is a great tool to keep the focus as you're building so you don't need to open the toolkit UX every time you need to provision.

---

## Q: Before we wrap up, are there any specific resources, articles, documentation links, or websites you want to reference in this tutorial?

**A:** I want to reference:
- The TypeSpec overview from the M365 Copilot dev site [URL TO BE ADDED]
- Getting started with TypeSpec [URL TO BE ADDED]
- "What are declarative agents" [URL TO BE ADDED]

---

## Resources Referenced

### Visual Artifacts
- Stack diagram: https://devblogs.microsoft.com/microsoft365dev/wp-content/uploads/sites/73/2025/11/DeclarativeAgents.webp

### Documentation Links
- TypeSpec examples: https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents-typespec
- Adding web content capability: https://learn.microsoft.com/microsoft-365-copilot/extensibility/build-declarative-agents-typespec#add-web-content

### To Be Added (Placeholders)
- TypeSpec overview from the M365 Copilot dev site
- Getting started with TypeSpec
- What are declarative agents

---

## Key Takeaways for the Article

1. **Target Audience:** TypeScript full-stack developers new to M365 Copilot and M365 development
2. **Main Value Proposition:** Minimal code/configuration for powerful results leveraging the M365 platform
3. **"Wow Moment":** Customized instructions working perfectly on first try
4. **Key Tip:** Use "-developer on" for debugging and command palette for faster workflow
5. **Common Gotcha:** Finding the toolkit sidebar vs explorer for project creation
6. **Success Story:** First websearch query worked immediately, customizations successful on first attempt
7. **Path to Production:** Built-in toolkit support for admin approval process
