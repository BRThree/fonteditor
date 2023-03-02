import { getProgramStore } from '@/store/programStore';
import { getGlyphListStore } from '@/store/glyphListStore';

export default {
    'adjust-pos': function (form) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        program.ttfManager.adjustGlyfPos(selected, form);
    },
    'adjust-glyph': function (form) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        program.ttfManager.adjustGlyf(selected, form);
    },
    'setting-font': function (form) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        program.ttfManager.updateGlyf(form, selected[0]);
    },
    'setting-unicode': function ({ unicode, isGenerateName }) {
        const { program } = getProgramStore();
        let { selected } = getGlyphListStore();
        setTimeout(function () {
            if (program.ttfManager.get()) {
                program.ttfManager.setUnicode(unicode, selected, isGenerateName);
            }
        }, 20);
    },
    'default': () => { },
};