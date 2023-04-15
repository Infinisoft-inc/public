// Define the types of attentional control
var AttentionalControl;
(function (AttentionalControl) {
    AttentionalControl["Voluntary"] = "Voluntary (Endogenous)";
    AttentionalControl["Automatic"] = "Automatic (Exogenous)";
})(AttentionalControl || (AttentionalControl = {}));
// Define the types of attentional shift
var AttentionalShiftType;
(function (AttentionalShiftType) {
    AttentionalShiftType["Overt"] = "Overt (with eye movements)";
    AttentionalShiftType["Covert"] = "Covert (without eye movements)";
})(AttentionalShiftType || (AttentionalShiftType = {}));
// Define the stages of attention orienting
var AttentionOrientingStage;
(function (AttentionOrientingStage) {
    AttentionOrientingStage["Disengagement"] = "Disengagement (take attention away from current focus)";
    AttentionOrientingStage["Shifting"] = "Shifting (redirect attention to a new target)";
    AttentionOrientingStage["Engagement"] = "Engagement (focus on the new target)";
})(AttentionOrientingStage || (AttentionOrientingStage = {}));
// Define the AttentionalShift class
var AttentionalShift = /** @class */ (function () {
    function AttentionalShift(control, shiftType) {
        this.control = control;
        this.shiftType = shiftType;
        this.currentStage = null;
    }
    // Simulate the attentional shift process
    AttentionalShift.prototype.simulateShift = function () {
        console.log("Attentional Control: ".concat(this.control));
        console.log("Attentional Shift Type: ".concat(this.shiftType));
        console.log('Starting attentional shift simulation...');
        // Go through each stage of attention orienting
        for (var stage in AttentionOrientingStage) {
            this.currentStage = AttentionOrientingStage[stage];
            console.log("Current Stage: ".concat(this.currentStage));
        }
        console.log('Attentional shift simulation complete.');
    };
    return AttentionalShift;
}());
// Instantiate and simulate an overt, voluntary attentional shift
var overtVoluntaryShift = new AttentionalShift(AttentionalControl.Voluntary, AttentionalShiftType.Overt);
overtVoluntaryShift.simulateShift();
// Instantiate and simulate a covert, automatic attentional shift
var covertAutomaticShift = new AttentionalShift(AttentionalControl.Automatic, AttentionalShiftType.Covert);
covertAutomaticShift.simulateShift();
// AttentionalShift, AttentionalControl, AttentionalShiftType, and AttentionOrientingStage
// are defined as in the previous script
var Attention = /** @class */ (function () {
    function Attention() {
        this.attentionalShift = null;
        this.attentionSpan = 0;
        this.isDistracted = false;
    }
    // Set the attention span
    Attention.prototype.setAttentionSpan = function (span) {
        this.attentionSpan = span;
    };
    // Set whether the individual is distracted
    Attention.prototype.setDistracted = function (distracted) {
        this.isDistracted = distracted;
    };
    // Initiate an attentional shift
    Attention.prototype.initiateAttentionalShift = function (control, shiftType) {
        this.attentionalShift = new AttentionalShift(control, shiftType);
        this.attentionalShift.simulateShift();
    };
    // Display the current state of attention
    Attention.prototype.displayAttentionState = function () {
        console.log('Attention State:');
        console.log("  Attention Span: ".concat(this.attentionSpan));
        console.log("  Distracted: ".concat(this.isDistracted));
        if (this.attentionalShift) {
            console.log('  Attentional Shift:');
            console.log("    Control: ".concat(this.attentionalShift.control));
            console.log("    Shift Type: ".concat(this.attentionalShift.shiftType));
        }
        else {
            console.log('  No ongoing attentional shift.');
        }
    };
    return Attention;
}());
// Instantiate the Attention class
var attention = new Attention();
// Set the attention span and distraction state
attention.setAttentionSpan(5);
attention.setDistracted(true);
// Display the current state of attention
attention.displayAttentionState();
// Initiate an overt, voluntary attentional shift
attention.initiateAttentionalShift(AttentionalControl.Voluntary, AttentionalShiftType.Overt);
// Display the updated state of attention
attention.displayAttentionState();
