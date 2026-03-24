(function () {
    let currentStep = 1;
    let turnstileVerified = false;
    let turnstileToken = "";
    const leadFormData = {
        case_type: "truck",
    };

    function showStep(stepNum) {
        document.querySelectorAll(".step-container").forEach((el) => el.classList.add("hidden"));
        const target = document.getElementById(`step-${stepNum}`);
        if (target) {
            target.classList.remove("hidden");
            currentStep = stepNum;
        }
    }

    function syncSubmitState() {
        const submitBtn = document.getElementById("submit-btn");
        const tcpa = document.getElementById("tcpa");
        if (!submitBtn) return;
        const enabled = !!tcpa?.checked && turnstileVerified;
        submitBtn.disabled = !enabled;
        submitBtn.classList.toggle("opacity-50", !enabled);
        submitBtn.classList.toggle("cursor-not-allowed", !enabled);
    }

    function updateGauge(delta) {
        const gauge = document.getElementById("strength-gauge");
        if (!gauge) return;
        const now = parseFloat(gauge.style.width || "10") || 10;
        const next = Math.max(10, Math.min(95, now + delta));
        gauge.style.width = `${next}%`;
    }

    function showInsight(text) {
        const box = document.getElementById("ai-feedback-box");
        const label = document.getElementById("ai-feedback-text");
        if (!box || !label) return;
        label.textContent = `AI INSIGHT: ${text}`;
        box.classList.remove("hidden");
    }

    window.openModal = function openModal() {
        const modal = document.getElementById("leadModal");
        if (!modal) return;
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        showStep(1);
    };

    window.closeModal = function closeModal() {
        const modal = document.getElementById("leadModal");
        if (!modal) return;
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    };

    window.nextStep = function nextStep(stepNum) {
        showStep(Number(stepNum));
    };

    window.prevStep = function prevStep() {
        if (currentStep <= 1) {
            window.closeModal();
            return;
        }
        showStep(currentStep - 1);
    };

    window.handleSelect = function handleSelect(key, val, next, feedback, bonus) {
        leadFormData[key] = val;
        updateGauge(Number(bonus || 0));
        showInsight(feedback || "Truck evidence profile updated.");
        setTimeout(() => showStep(Number(next)), 250);
    };

    window.onTurnstileVerified = function onTurnstileVerified(token) {
        turnstileToken = token || "";
        turnstileVerified = !!turnstileToken;
        syncSubmitState();
    };

    window.onTurnstileExpired = function onTurnstileExpired() {
        turnstileToken = "";
        turnstileVerified = false;
        syncSubmitState();
    };

    window.submitFinalLead = async function submitFinalLead(event) {
        event.preventDefault();
        const tcpa = document.getElementById("tcpa");
        if (!tcpa?.checked) {
            alert("Express written consent is required before submitting your case.");
            return;
        }
        if (!turnstileVerified) {
            alert("Please complete the security verification.");
            return;
        }

        leadFormData.fName = document.getElementById("fName")?.value || "";
        leadFormData.lName = document.getElementById("lName")?.value || "";
        leadFormData.email = document.getElementById("email")?.value || "";
        leadFormData.phone = document.getElementById("userPhone")?.value || "";
        leadFormData.narrative = "";
        leadFormData.state = document.getElementById("hero-state-name")?.textContent?.trim() || "";
        leadFormData.type = "Truck";
        leadFormData.fault = "unknown";
        leadFormData.med = "unknown";
        leadFormData.police = "unknown";
        leadFormData.atty = "unknown";
        leadFormData["cf-turnstile-response"] = turnstileToken;
        leadFormData.turnstileToken = turnstileToken;
        leadFormData.tcpa_checked = true;

        const step5 = document.getElementById("step-5");
        if (step5) step5.classList.add("hidden");
        const body = document.getElementById("modalBody");
        if (body) {
            const loading = document.createElement("div");
            loading.className = "py-10 text-center text-slate-700 font-semibold";
            loading.textContent = "Analyzing Federal FMCSA Compliance...";
            body.appendChild(loading);
        }

        try {
            const response = await fetch("/api/insert-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadFormData),
            });
            const result = await response.json();
            if (result?.success) {
                window.location.href = "../../success.html";
                return;
            }
            alert(result?.error || "Failed to submit lead.");
        } catch (err) {
            console.error(err);
            alert("Submission failed. Please try again.");
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        const tcpa = document.getElementById("tcpa");
        if (tcpa) tcpa.addEventListener("change", syncSubmitState);
        syncSubmitState();
    });
})();
