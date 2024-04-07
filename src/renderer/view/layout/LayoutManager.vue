<template>
  <div class="root full column" :class="appSetting.thema">
    <div class="header column">
      <select :value="store.currentProfileURI" @change="selectProfile">
        <option :value="uri.ES_STANDARD_LAYOUT_PROFILE">Standard</option>
        <option
          v-for="(profile, index) of store.customLayoutProfiles"
          :key="index"
          :value="profile.uri"
        >
          {{ profile.name }}
        </option>
      </select>
      <div class="row">
        <button class="" @click="addNewProfile">Add Custom Layout</button>
        <button v-if="customProfile" @click="copyProfile">Copy Current Profile</button>
        <button v-if="customProfile" @click="removeProfile">Remove Current Profile</button>
      </div>
    </div>
    <div v-if="customProfile" class="custom-profile column grow scroll">
      <div class="row">
        <span class="key">Name:</span>
        <input
          :value="customProfile.name"
          @input="(e) => updateCustomProfileProp('name', inputEventToString(e))"
        />
      </div>
      <div v-for="(component, index) of customProfile.components" :key="index" class="component">
        <div class="name">{{ component.type }}</div>
        <div>
          <span class="property">
            <span class="key">Left:</span>
            <input
              class="value"
              type="number"
              :value="component.left"
              @input="(e) => updateCustomProfileComponent(index, 'left', inputEventToNumber(e))"
            />
          </span>
          <span class="property">
            <span class="key">Top:</span>
            <input
              class="value"
              type="number"
              :value="component.top"
              @input="(e) => updateCustomProfileComponent(index, 'top', inputEventToNumber(e))"
            />
          </span>
          <span class="property">
            <span class="key">Width:</span>
            <input
              class="value"
              type="number"
              :value="component.width"
              @input="(e) => updateCustomProfileComponent(index, 'width', inputEventToNumber(e))"
            />
          </span>
          <span class="property">
            <span class="key">Height:</span>
            <input
              class="value"
              type="number"
              :value="component.height"
              @input="(e) => updateCustomProfileComponent(index, 'height', inputEventToNumber(e))"
            />
          </span>
        </div>
        <div v-if="component.type === 'Board'">
          <span class="property">
            <ToggleButton
              :value="!!component.rightControlBox"
              label="Right Control Box"
              @change="(value) => updateCustomProfileComponent(index, 'rightControlBox', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.leftControlBox"
              label="Left Control Box"
              @change="(value) => updateCustomProfileComponent(index, 'leftControlBox', value)"
            />
          </span>
        </div>
        <div v-if="component.type === 'Record'">
          <span class="property">
            <ToggleButton
              :value="!!component.showCommentColumn"
              label="Comment Column"
              @change="(value) => updateCustomProfileComponent(index, 'showCommentColumn', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showElapsedTimeColumn"
              label="Elapsed Time Column"
              @change="
                (value) => updateCustomProfileComponent(index, 'showElapsedTimeColumn', value)
              "
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.topControlBox"
              label="Top Control Box"
              @change="(value) => updateCustomProfileComponent(index, 'topControlBox', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.branches"
              label="Branches"
              @change="(value) => updateCustomProfileComponent(index, 'branches', value)"
            />
          </span>
        </div>
        <div v-if="component.type === 'Chart'">
          <span class="property">
            <HorizontalSelector
              :value="component.chartType"
              :items="[
                { label: 'Raw', value: EvaluationChartType.RAW },
                { label: 'Win Rate', value: EvaluationChartType.WIN_RATE },
              ]"
              @change="(value) => updateCustomProfileComponent(index, 'chartType', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showLegend"
              label="Legend"
              @change="(value) => updateCustomProfileComponent(index, 'showLegend', value)"
            />
          </span>
        </div>
        <div v-if="component.type === 'Analytics'">
          <span class="property">
            <ToggleButton
              :value="!!component.historyMode"
              label="History Mode"
              @change="(value) => updateCustomProfileComponent(index, 'historyMode', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showHeader"
              label="Header"
              @change="(value) => updateCustomProfileComponent(index, 'showHeader', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showTimeColumn"
              label="Time Column"
              @change="(value) => updateCustomProfileComponent(index, 'showTimeColumn', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showMultiPvColumn"
              label="MultiPV Column"
              @change="(value) => updateCustomProfileComponent(index, 'showMultiPvColumn', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showDepthColumn"
              label="Depth Column"
              @change="(value) => updateCustomProfileComponent(index, 'showDepthColumn', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showNodesColumn"
              label="Nodes Column"
              @change="(value) => updateCustomProfileComponent(index, 'showNodesColumn', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showScoreColumn"
              label="Score Column"
              @change="(value) => updateCustomProfileComponent(index, 'showScoreColumn', value)"
            />
          </span>
          <span class="property">
            <ToggleButton
              :value="!!component.showPlayButton"
              label="Play Button"
              @change="(value) => updateCustomProfileComponent(index, 'showPlayButton', value)"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as uri from "@/common/uri";
import { useStore } from "@/renderer/layout/store";
import { useAppSetting } from "@/renderer/store/setting";
import { computed } from "vue";
import ToggleButton from "@/renderer/view/primitive/ToggleButton.vue";
import HorizontalSelector from "@/renderer/view/primitive/HorizontalSelector.vue";
import { inputEventToString, inputEventToNumber } from "@/renderer/helpers/form";
import { EvaluationChartType } from "@/common/settings/layout";

const appSetting = useAppSetting();
const store = useStore();

const customProfile = computed(() =>
  store.customLayoutProfiles.find((profile) => profile.uri === store.currentProfileURI),
);

const selectProfile = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  store.selectProfile(target.value);
};

const addNewProfile = () => {
  store.addCustomProfile();
};

const copyProfile = () => {
  store.copyCustomProfile(store.currentProfileURI);
};

const removeProfile = () => {
  if (store.currentProfileURI.startsWith(uri.ES_CUSTOM_LAYOUT_PROFILE_PREFIX)) {
    // FIXME: confirmation dialog
    store.removeCustomProfile(store.currentProfileURI);
  }
};

const updateCustomProfileProp = (key: string, value: unknown) => {
  const profile = store.customLayoutProfiles.find(
    (profile) => profile.uri === store.currentProfileURI,
  );
  if (!profile) {
    return;
  }
  store.updateCustomProfile(store.currentProfileURI, { ...profile, [key]: value });
};

const updateCustomProfileComponent = (index: number, key: string, value: unknown) => {
  const profile = store.customLayoutProfiles.find(
    (profile) => profile.uri === store.currentProfileURI,
  );
  if (profile) {
    store.updateCustomProfile(store.currentProfileURI, {
      ...profile,
      components: profile.components.map((component, i) => {
        if (i !== index) {
          return component;
        }
        return { ...component, [key]: value };
      }),
    });
  }
};
</script>

<style scoped>
button {
  margin: 0px 5px 0px 0px;
  padding: 5px 10px 5px 10px;
  vertical-align: middle;
}
.root {
  color: var(--dialog-color);
  background-color: var(--dialog-bg-color);
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.root > *:not(:last-child) {
  margin-bottom: 10px;
}
.header > *:not(:last-child) {
  margin-bottom: 10px;
}
.custom-profile {
  border: 1px dashed var(--dialog-border-color);
  border-radius: 10px;
  padding: 10px;
}
.custom-profile > *:not(:last-child) {
  margin-bottom: 10px;
}
.component {
  border: 1px solid var(--dialog-border-color);
  padding: 10px;
}
.component > * {
  text-align: left;
}
.component > .name {
  font-weight: bold;
}
.component > *:not(:last-child) {
  margin-bottom: 5px;
}
.property:not(:last-child) {
  display: inline-block;
  margin-right: 20px;
}
.key {
  display: inline-block;
  text-align: center;
  min-width: 60px;
  margin-right: 5px;
}
.value {
  display: inline-block;
  width: 50px;
}
</style>
